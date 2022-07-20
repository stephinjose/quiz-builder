using Common.Interfaces;
using Common.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Common.Services
{
    public class QuizService : IQuizService
    {
        private readonly IConfiguration _configuration;
        public QuizService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<ValidationResults> CreateQuiz(Quiz quiz, User appUser)
        {
            var validationResults = _validate(quiz);
            if (!validationResults.Success)
            {
                return validationResults;
            }

            var permalink = _generatePermalink();
            var dt = constructQuestionsTable(quiz);
            using (var conn = new SqlConnection(_configuration["AppSettings:DbConnectionString"]))
            {
                conn.Open();
                await conn.ExecuteAsync("sp_Quiz_Create", new
                {
                    Auth0Id = appUser.Auth0Id,
                    Email = appUser.Email,
                    QuizTitle = quiz.title,
                    Permalink = permalink,
                    Questions = dt.AsTableValuedParameter("dbo.udt_New_Quiz_Questions")
                },
                    commandType: CommandType.StoredProcedure);
            }

            validationResults.PermaLink = permalink;

            return validationResults;
        }

        public async Task<IEnumerable<Quiz>> GetQuizzes(User appUser)
        {
            using (var conn = new SqlConnection(_configuration["AppSettings:DbConnectionString"]))
            {
                conn.Open();
                return await conn.QueryAsync<Quiz>("sp_Quizzes_GetAll", new { Auth0Id = appUser.Auth0Id }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Quiz> RetrieveQuiz(string permalink)
        {
            using (var conn = new SqlConnection(_configuration["AppSettings:DbConnectionString"]))
            {
                conn.Open();
                var results = await conn.QueryMultipleAsync("sp_Quiz_Retrieve", new { permalink }, commandType: CommandType.StoredProcedure);
                var quiz = await results.ReadSingleAsync<Quiz>();
                var questions = await results.ReadAsync<Question>();
                var answers = await results.ReadAsync<Answer>();
                
                foreach(var ansGroup in answers.GroupBy(ans => ans.questionId))
                {
                    var question = questions.Single(q => q.id == ansGroup.Key);
                    question.answers = ansGroup.ToArray();
                }

                quiz.questions = questions.ToArray();

                return quiz;
            }
        }

        public async Task<TestResults> VerifyQuiz(Quiz quiz)
        {

        }

        public async Task<int> DeleteQuiz(User appUser, int quizId)
        {
            using (var conn = new SqlConnection(_configuration["AppSettings:DbConnectionString"]))
            {
                conn.Open();
                return await conn.ExecuteAsync("sp_Quizzes_Delete", new { Auth0Id = appUser.Auth0Id, quizId }, commandType: CommandType.StoredProcedure);
            }
        }

        private static Random random = new Random();
        private static string _generatePermalink()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private DataTable constructQuestionsTable(Quiz quiz)
        {
            var tableQuestions = new DataTable();
            tableQuestions.Columns.Add("QuestionSortOrder", typeof(int));
            tableQuestions.Columns.Add("QuestionText", typeof(string));
            tableQuestions.Columns.Add("QuestionType", typeof(char));
            tableQuestions.Columns.Add("AnswerSortOrder", typeof(int));
            tableQuestions.Columns.Add("AnswerText", typeof(string));
            tableQuestions.Columns.Add("IsCorrect", typeof(bool));
            int questionSortOrder = 1;
            foreach (var question in quiz.questions)
            {
                int answerSortOrder = 1;
                foreach (var answer in question.answers)
                {
                    tableQuestions.Rows.Add(questionSortOrder, question.text, question.type, answerSortOrder++, answer.text, answer.isCorrect);
                }
                questionSortOrder++;
            }

            return tableQuestions;
        }

        private ValidationResults _validate(Quiz quiz)
        {
            var results = new ValidationResults();
            results.Success = true;

            if (quiz == null)
            {
                _addError(results, "Quiz is null");
                return results;
            }
            if (string.IsNullOrWhiteSpace(quiz.title))
            {
                _addError(results, "Quiz title is missing");
            }
            if (quiz.questions == null || quiz.questions.Length == 0)
            {
                _addError(results, "Questions array not found or is empty");
                return results;
            }
            foreach (var question in quiz.questions)
            {
                if (string.IsNullOrWhiteSpace(question.text))
                {
                    _addError(results, "Question text is missing");
                }
                if (question.type != 'M' && question.type != 'S')
                {
                    _addError(results, "Invalid question type (Should be 'S' or 'M')");
                }
                else
                {
                    if (question.answers == null || question.answers.Length == 0)
                    {
                        _addError(results, "No answer added for the question");
                        break;
                    }
                    var correctAnswerFound = false;
                    foreach (var answer in question.answers)
                    {
                        if (string.IsNullOrWhiteSpace(answer.text))
                        {
                            _addError(results, "Answer text is missing");
                        }
                        if (question.type == 'S')
                        {
                            if (answer.isCorrect)
                            {
                                if (correctAnswerFound)
                                {
                                    _addError(results, "Multiple correct answer marked for single answer type question");
                                    break;
                                }
                                else
                                {
                                    correctAnswerFound = true;
                                }
                            }
                        }
                    }
                    if (!correctAnswerFound && question.type == 'S')
                    {
                        _addError(results, "No answer marked correct for single answer type question");
                    }
                }
            }
            return results;
        }

        private void _addError(ValidationResults results, string error)
        {
            results.Success = false;
            if (results.Errors == null)
            {
                results.Errors = new List<string>();
            }
            results.Errors.Add(error);
        }
    }
}

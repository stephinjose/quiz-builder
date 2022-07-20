using Common.Interfaces;
using Common.Models;
using Dapper;

namespace Common.Services
{
    public class QuizService : IQuizService
    {
        public async Task<ValidationResults> CreateQuiz(Quiz quiz)
        {
            var validationResults = _validate(quiz);
            if (!validationResults.Success)
            {
                return validationResults;
            }
            return validationResults;
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

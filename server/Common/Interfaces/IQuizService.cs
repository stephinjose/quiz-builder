using Common.Models;

namespace Common.Interfaces
{
    public interface IQuizService
    {
        public Task<ValidationResults> CreateQuiz(Quiz quiz, User appUser);
        public Task<IEnumerable<Quiz>> GetQuizzes(User appUser);
        Task<Quiz> RetrieveQuiz(string permalink);
        Task<int> DeleteQuiz(User appUser, int quizId);
        Task<TestResults> VerifyQuiz(Quiz quiz);
    }
}

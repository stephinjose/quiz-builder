using Common.Models;

namespace Common.Interfaces
{
    public interface IQuizService
    {
        public Task<ValidationResults> CreateQuiz(Quiz quiz, User appUser);
        public Task<IEnumerable<Quiz>> GetQuizzes(User appUser);
    }
}

using Common.Models;

namespace Common.Interfaces
{
    public interface IQuizService
    {
        public Task<ValidationResults> CreateQuiz(Quiz quiz);
    }
}

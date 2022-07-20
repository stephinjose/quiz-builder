using Common.Interfaces;
using Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : CustomBaseController
    {
        private readonly IQuizService _quizService;
        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<ValidationResults> CreateQuiz(Quiz quiz)
        {
            return await _quizService.CreateQuiz(quiz, AppUser);
        }

        [HttpGet("list")]
        [Authorize]
        public async Task<IEnumerable<Quiz>> GetQuizzes()
        {
            return await _quizService.GetQuizzes(AppUser);
        }

        [HttpGet("retrieve/{permalink}")]
        public async Task<Quiz> RetrieveQuiz(string permalink)
        {
            return await _quizService.RetrieveQuiz(permalink);
        }

        [HttpPost("verify")]
        public async Task<TestResults> VerifyQuiz(Quiz quiz)
        {
            return await _quizService.VerifyQuiz(quiz);
        }

        [HttpDelete("{quizId}")]
        [Authorize]
        public async Task<int> GetQuizzes(int quizId)
        {
            return await _quizService.DeleteQuiz(AppUser, quizId);
        }
    }
}

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
    }
}

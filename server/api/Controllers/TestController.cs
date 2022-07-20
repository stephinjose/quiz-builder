using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : CustomBaseController
    {
        [HttpGet("test")]
        [Authorize]
        public dynamic Test()
        {
            return new { AppUser.Auth0Id, AppUser.Email };
        }
    }
}

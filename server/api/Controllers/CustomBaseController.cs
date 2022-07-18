using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api.Controllers
{
    public class CustomBaseController : ControllerBase
    {
        public string? UserId
        {
            get
            {
                var userIdClaim = User?.FindFirst(ClaimTypes.NameIdentifier);
                return userIdClaim?.Value;
            }
        }

        public string? Email
        {
            get
            {
                var emailClaim = User?.FindFirst("https://example.com/email");
                return emailClaim?.Value;
            }
        }
    }
}

using Common.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api.Controllers
{
    public class CustomBaseController : ControllerBase
    {
        public User AppUser
        {
            get
            {
                var userIdClaim = User?.FindFirst(ClaimTypes.NameIdentifier);
                var emailClaim = User?.FindFirst("https://example.com/email");
                if(userIdClaim != null && emailClaim != null)
                {
                    return new User { Auth0Id = userIdClaim.Value, Email = emailClaim.Value };
                }
                return null;
            }
        }
    }
}

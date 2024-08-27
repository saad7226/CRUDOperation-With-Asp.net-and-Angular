using Employees.Server.CommonFunctions;
using Employees.Server.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Employees.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigion")]
    public class AuthenticationController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;
        private readonly IConfiguration _configuration;

        public AuthenticationController(EmployeeContext employeeContext, IConfiguration configuration)
        {
            _employeeContext=employeeContext;
            _configuration=configuration;
        }

        [HttpPost]

        public async Task<IActionResult> PostLoginDetails(UserDetail userModel)
        {
            try
            {
                if (userModel != null)
                {
                    var result = _employeeContext.userModels.Where(t => t.Email == userModel.Email && t.Password == userModel.Password).FirstOrDefault();
                    if (string.IsNullOrEmpty(result.Email))
                    {
                        return BadRequest("Invalid Credntials");
                    }
                    else
                    {
                        userModel.UserMessage = "Login Success";
                        userModel.AccessToken = GenerateToken.GetToken(userModel, _configuration);
                        return Ok(userModel);
                    }
                }
                else
                {
                    return BadRequest("No data found");
                }
            } catch (Exception ex)
            {
                throw;

            }

        }

      
    }
}

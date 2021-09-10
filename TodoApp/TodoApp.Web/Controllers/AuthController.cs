using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

using TodoApp.Bll.Dtos;
using TodoApp.Bll.Managers;
using TodoApp.Common.Helpers;

namespace TodoApp.Web.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/user")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IAuthManager AuthManager { get; set; }

        public AuthController(IAuthManager authManager)
        {
            AuthManager = authManager;
        }


        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto user)
        {
            if (user == null)
            {
                return BadRequest("Request can't be completed. Internal server error.");
            }

            var response = await AuthManager.LoginAsync(user.Username, user.Password);

            if (response.Succeeded)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345")); //TODO get from somewhere, maxbe Azure KeyVault
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var roles = await AuthManager.GetRolesForUserAsync(user.Username);

                var claimList = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                };
                foreach (var role in roles)
                    claimList.Add(new Claim(ClaimTypes.Role, role));

                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:44353", //TODO get from config
                    audience: "http://localhost:44353", //TODO get from config
                    claims: claimList,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new LoginResponseDto { Token = tokenString, NeedNewPassword = DefaultPasswordHelper.GenerateDefaultPasswordForUser(user.Username) == user.Password });
            }
            else
            {
                return BadRequest("Login failed. Invalid username or password.");
            }
        }

        [Authorize]
        [HttpPost, Route("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto passwordDto)
        {
            var result = await AuthManager.ChangePasswordAsync(HttpContext.User.Identity.Name, passwordDto.CurrentPassword, passwordDto.NewPassword);

            if (result.Succeeded)
                return Ok();
            else
                return BadRequest(result.Errors.Select(e => e.Description).ToList());
        }

        [Authorize]
        [HttpGet, Route("rolesforuser")]
        public async Task<IActionResult> GetRolesForUser()
        {
            var roles = await AuthManager.GetRolesForUserAsync(HttpContext.User.Identity.Name);
            return Ok(roles);
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto user)
        {
            if (user == null)
                return BadRequest("Request can't be completed. Internal server error.");

            var result = await AuthManager.AddUserAsync(user);

            if (result.Succeeded)
                return Ok();
            else
                return BadRequest(result.Errors.Select(e => e.Description).ToList());
        }
    }
}

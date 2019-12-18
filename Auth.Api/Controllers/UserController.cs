using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Auth.Api.Helpers;
using Auth.Api.Models.Identity;
using Auth.Api.Models.Requests;
using Auth.Api.Models.Responses;

namespace Auth.Api.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        // GET api/user/userdata
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<ActionResult> UserData()
        {
            var user = await _userManager.GetUserAsync(User);
            var userData = new UserDataResponse
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                RoleId = user.RoleId,
                Email = user.Email
            };
            return Ok(userData);
        }

        // POST api/user/register
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterEntity registerUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var appUser = new ApplicationUser { FirstName = registerUser.FirstName, LastName = registerUser.LastName, UserName = registerUser.UserName, Email = registerUser.Email, RoleId = registerUser.RoleId };
            var appUserInDB = await _userManager.FindByNameAsync(registerUser.UserName);

            if (appUserInDB == null)
            {
                var userAddedResult = await _userManager.CreateAsync(appUser, registerUser.Password);

                if (userAddedResult.Succeeded)
                {
                   
                    if (registerUser.RoleId != string.Empty)
                    {
                        var roleAddedResult = await _userManager.AddToRoleAsync(appUser, registerUser.RoleId);

                        if (!roleAddedResult.Succeeded)
                        {
                            ModelState.AddModelError("role_assignment_failed", $"Failed to assign a role to the user {registerUser.UserName}. Please contact the administrator");
                        }
                        else
                        {
                            await _userManager.AddClaimAsync(appUser, new Claim("userName", registerUser.UserName));
                            await _userManager.AddClaimAsync(appUser, new Claim("firstName", registerUser.FirstName));
                            await _userManager.AddClaimAsync(appUser, new Claim("lastName", registerUser.LastName));
                            await _userManager.AddClaimAsync(appUser, new Claim("email", registerUser.Email));
                            await _userManager.AddClaimAsync(appUser, new Claim("role", registerUser.RoleId));
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("search_role_failed", $"Failed to find the suitable role. Please contact the administrator");
                    }

                    List<string> userRoles = new List<string>();
                    userRoles.Add(appUser.RoleId);
                    var token = AuthenticationHelper.GenerateJwtToken(registerUser.UserName, appUser, userRoles, _configuration);                   
                    var rootData = new SignUpResponse(token, appUser.UserName, appUser.Email);
                    return Created("api/v1/user/register", rootData);
                }
                else
                {
                    ModelState.AddModelError("add_user_failed", $"Failed to add the user \"{registerUser.UserName}\". Please contact the administrator");
                }
            }
            else
            {
                ModelState.AddModelError("user_exists", $"The Username \"{registerUser.UserName}\" is already taken!");
            }

            return BadRequest(ModelState);
        }

      
        // POST api/user/login
        [HttpPost("login")]
        [AllowAnonymous]     
        public async Task<ActionResult> Login([FromBody]LoginEntity authRequest)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(authRequest.Username, authRequest.Password, false, false);

                if (result.Succeeded)
                {                   
                    var appUser = await _userManager.FindByNameAsync(authRequest.Username);                 
                    List<string> userRoles = new List<string>();
                    userRoles.Add(appUser.RoleId);

                    var token = AuthenticationHelper.GenerateJwtToken(authRequest.Username, appUser, userRoles, _configuration);

                    var rootData = new LoginResponse(token, appUser.UserName, appUser.Email);
                    return Ok(rootData);
                }
                return StatusCode((int)HttpStatusCode.Unauthorized, "Bad Credentials");
            }
            string errorMessage = string.Join(", ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
            return BadRequest(errorMessage ?? "Bad Request");
        }      
    }
}

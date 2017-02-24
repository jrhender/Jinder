using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
//using Jinder.Models;
using Jinder.Models.HomeViewModels;
//using Jinder.Services;
using Microsoft.AspNetCore.Http.Authentication;

namespace Jinder.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        //private readonly UserManager<ApplicationUser> _userManager;
        //private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public AccountController(
            //UserManager<ApplicationUser> userManager,
            //SignInManager<ApplicationUser> signInManager,
            ILoggerFactory loggerFactory)
        {
            //_userManager = userManager;
            //_signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        //
        // GET: /Account/Login
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                //var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                
                const string Issuer = "https://Jinder.com";

                var claims = new List<Claim> {
                    new Claim(ClaimTypes.Name, "Authorized", ClaimValueTypes.String, Issuer),
                    new Claim(ClaimTypes.Surname, "Lock", ClaimValueTypes.String, Issuer),
                    new Claim(ClaimTypes.Country, "UK", ClaimValueTypes.String, Issuer),
                    new Claim("ChildhoodHero", "Ronnie James Dio", ClaimValueTypes.String)
                };

                var userIdentity = new ClaimsIdentity(claims, "Passport");

                var userPrincipal = new ClaimsPrincipal(userIdentity);

                await HttpContext.Authentication.SignInAsync("Cookie", userPrincipal,
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
                        IsPersistent = false,
                        AllowRefresh = false
                    });

                return RedirectToLocal(returnUrl);
                
                // if (result.Succeeded)
                // {
                //     _logger.LogInformation(1, "User logged in.");
                //     return RedirectToLocal(returnUrl);
                // }
                // if (result.RequiresTwoFactor)
                // {
                //     return RedirectToAction(nameof(SendCode), new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                // }
                // if (result.IsLockedOut)
                // {
                //     _logger.LogWarning(2, "User account locked out.");
                //     return View("Lockout");
                // }
                // else
                // {
                //     ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                //     return View(model);
                // }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        #region Helpers

        // private void AddErrors(IdentityResult result)
        // {
        //     foreach (var error in result.Errors)
        //     {
        //         ModelState.AddModelError(string.Empty, error.Description);
        //     }
        // }

        // private Task<ApplicationUser> GetCurrentUserAsync()
        // {
        //     return _userManager.GetUserAsync(HttpContext.User);
        // }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        #endregion
    }
}
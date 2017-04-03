using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Authentication;
using Jinder.Models.HomeViewModels;


namespace Jinder.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Authorize(Policy = "isAuthorized")]
        public IActionResult Jinder()
        {
            return View();
        }

        public IActionResult JinderReact()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult Login()
        {
            ViewData["Message"] = "Login Page";

            return View();
        }

        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid && model.Password == "jinglebellrocks")
            {                
                var claims = new List<Claim> {
                    new Claim("Authorized", "isAuthorized", ClaimValueTypes.String)
                };

                var userIdentity = new ClaimsIdentity(claims);

                var userPrincipal = new ClaimsPrincipal(userIdentity);

                await HttpContext.Authentication.SignInAsync("Cookie", userPrincipal,
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddDays(30),
                        IsPersistent = false,
                        AllowRefresh = false
                    });
                return RedirectToAction(nameof(HomeController.Jinder), "Home");
            }

            // If we got this far, something failed, redisplay form
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }
    }
}

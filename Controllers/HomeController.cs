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

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        [Authorize(Policy = "isAuthorized")]
        public IActionResult Jinder()
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
                const string Issuer = "https://Jinder.com";

                var claims = new List<Claim> {
                    new Claim(ClaimTypes.Name, "Authorized", ClaimValueTypes.String, Issuer),
                    new Claim(ClaimTypes.Surname, "Lock", ClaimValueTypes.String, Issuer),
                    new Claim(ClaimTypes.Country, "UK", ClaimValueTypes.String, Issuer),
                    new Claim("Authorized", "isAuthorized", ClaimValueTypes.String)
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

                //return RedirectToLocal(returnUrl);
                return RedirectToAction(nameof(HomeController.Jinder), "Home");
            }

            // If we got this far, something failed, redisplay form
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

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
    }
}

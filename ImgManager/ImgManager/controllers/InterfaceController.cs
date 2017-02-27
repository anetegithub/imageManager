using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ImgManager.Controllers
{
    public class InterfaceController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Template(string name)
        {
            return View("~/views/templates/" + name + ".cshtml");
        }
    }
}
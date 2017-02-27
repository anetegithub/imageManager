using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ImgManager.api
{
    public class UtilsController : ApiController
    {
        public string ServerTime()
        {
            return DateTime.Now.ToString("HH:mm:ss");
        }
    }
}

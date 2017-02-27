using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImgManager
{
    public static class Extensions
    {
        public static string f(this string str, params object[] param)
        {
            return string.Format(str, param);
        }
    }
}
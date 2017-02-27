using System.Diagnostics;
using System.Web;
using System.Web.Optimization;

namespace ImgManager
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.ResetAll();

            bundles.Add(new ScriptBundle("~/js/compiled").Include(
                        "~/js/jquery-{version}.js",
                        "~/js/materialize.js",
                        "~/js/application.js"));

            bundles.Add(new StyleBundle("~/css/compiled").Include(
                      "~/css/materialize.css",
                      "~/css/custom.css"));

            if (!Debugger.IsAttached)
                BundleTable.EnableOptimizations = true;
        }
    }
}

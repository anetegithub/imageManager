using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ImgManager.Startup))]
namespace ImgManager
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

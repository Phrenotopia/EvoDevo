using EvoDevo.Properties;
using EvoDevoCore.Logic.Factory;
using System.Web;
using System.Web.Http;

namespace EvoDevo
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            var path = HttpContext.Current.Server.MapPath(@Settings.Default.path + @"Server\worlds\alpha\map.json");

            WorldFactory.Create(path);


        }
    }
}

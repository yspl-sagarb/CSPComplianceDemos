using System.Web.Optimization;

namespace DevExtremeMvcDataGrid
{

    public class BundleConfig {

        public static void RegisterBundles(BundleCollection bundles) {

            var scriptBundle = new Bundle("~/Scripts/bundle");
            var styleBundle = new Bundle("~/Content/bundle");

            // jQuery
            scriptBundle
                .Include("~/Scripts/jquery-3.7.0.js");

            // Bootstrap
            scriptBundle
                .Include("~/Scripts/bootstrap.bundle.js");

            // Bootstrap
            styleBundle
                .Include("~/Content/bootstrap.min.css");

            // Custom site styles
            styleBundle
                .Include("~/Content/Site.css");

            bundles.Add(scriptBundle);
            bundles.Add(styleBundle);

            bundles.Add(new ScriptBundle("~/Scripts/signalR").Include("~/lib/signalr/jquery.signalR.js").Include("~/lib/signalr/signalr-hub.js"));

            // BundleTable.EnableOptimizations = true;
        }
    }
}
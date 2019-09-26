using AOCRaad.Keurmerken.Domain;
using System.Configuration;
using System.Web;

namespace AOCRaad.Erkenningen.VakkenBeheer
{
  /// <summary>
  /// DownloadFile for VakkenBeheer
  /// </summary>
  public class DownloadFile : BaseHttpHandler
  {

    public override void HandleRequest(HttpContext context)
    {
      // Use default secure file handler
      HandleDefaultRequest(context);
    }

    public override string FileRoot
    {
      get
      {
        return ConfigurationManager.AppSettings["ArchiefFolder"] +
          string.Format(@"\Portals\{0}\VakDocument\", DotNetNuke.Entities.Portals.PortalController.Instance.GetCurrentPortalSettings().PortalId);
      }
    }

    public override bool RequiresAuthentication
    {
      get { return true; }
    }

    public override bool DeriveMimeType
    {
      get { return true; }
    }

    public override bool ValidateParameters(HttpContext context)
    {
      return true;
    }
  }
}

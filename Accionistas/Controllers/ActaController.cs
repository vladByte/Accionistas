using Microsoft.AspNetCore.Mvc;

namespace Accionistas.Controllers;

public class ActaController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
    
}
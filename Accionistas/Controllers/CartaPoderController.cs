using Microsoft.AspNetCore.Mvc;

namespace Accionistas.Controllers;

public class CartaPoderController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
    
}
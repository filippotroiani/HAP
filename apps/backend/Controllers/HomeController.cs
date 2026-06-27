using hap.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace hap.Backend.Controllers;

[ApiController]
[Route("")]
public class HomeController : ControllerBase
{
    private readonly IDBService _dbService;
    public HomeController(IDBService dBService)
    {
        _dbService = dBService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok("HAP backend is running!");
    }

    [HttpGet("linkUtili", Name = "GetLinks")]
    public IActionResult GetLinks()
    {
        return Ok(_dbService.GetLinkUtili());
    }

}
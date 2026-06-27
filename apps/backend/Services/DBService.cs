using hap.Backend.Configurations;
using hap.Backend.Models;
using Microsoft.Extensions.Options;

namespace hap.Backend.Services;

public class DBService: IDBService
{
    private readonly object _DBContext;
    public DBService(IOptions<AppConfiguration> options)
    {
        _DBContext = null; // TODO Instantiate context with options.Value.DBConnectionString
    }

    public List<LinkUtile> GetLinkUtili()
    {
        return [
            new LinkUtile() {
                Title = "Google",
                Url = "https://google.com",
                Description = "questa è una descrizione"
            }
        ];
    }
}
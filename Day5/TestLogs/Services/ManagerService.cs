using Microsoft.Extensions.Logging;

namespace TestLogs.Services;

public class ManagerService(ILogger<ManagerService> logger)
{

    public async Task<int> GetTheValue(int id)
    {
        using (logger.BeginScope(new { userId = id, BeginTime = DateTime.Now }))
        {
            logger.LogTrace("Trace value {id}", id);
            logger.LogDebug("Debug value {id}", id);
            await Task.Delay(2000);
            logger.LogInformation("info value");
            logger.LogWarning("Warning value");
            logger.LogError("error value");
            DoTheCode();
            logger.LogCritical("Critical");
            return id;
        }
    }

    private void DoTheCode()
    {
        using (logger.BeginScope(new { fromTheDoTheCodeFunction = true }))
        {
            logger.LogInformation("DoTheCode invoked 1 ");
            logger.LogInformation("DoTheCode invoked 2");
            logger.LogInformation("DoTheCode invoked 3");
            logger.LogInformation("DoTheCode invoked 4");

        }
    }

}

namespace HarnessOpsLab.Tests;

public class HealthStatusTests
{
    [Fact]
    public void F01_health_returns_ok()
    {
        Assert.Equal("ok", HealthStatus.GetStatus());
    }

    [Fact]
    public void F02_workspace_has_agents_md()
    {
        var repoRoot = FindRepoRoot();
        Assert.True(File.Exists(Path.Combine(repoRoot, "AGENTS.md")));
    }

    private static string FindRepoRoot()
    {
        var dir = AppContext.BaseDirectory;
        while (!string.IsNullOrEmpty(dir))
        {
            if (File.Exists(Path.Combine(dir, "AGENTS.md")))
                return dir;
            var parent = Directory.GetParent(dir);
            dir = parent?.FullName ?? "";
        }
        throw new InvalidOperationException("Could not find lab root (AGENTS.md)");
    }
}

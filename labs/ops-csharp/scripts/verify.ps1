# Harness verification for OPS C# lab (pass-state gating helper)
$ErrorActionPreference = "Stop"
$LabRoot = Split-Path $PSScriptRoot -Parent
Set-Location $LabRoot

Write-Host "→ dotnet build..."
dotnet build --verbosity quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "→ dotnet test (all)..."
dotnet test --verbosity quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Harness verification passed"

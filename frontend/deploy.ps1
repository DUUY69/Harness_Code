# Deploy Harness landing to 168.144.38.133:8093
$ErrorActionPreference = "Stop"
$Remote = "root@168.144.38.133"
$RemoteDir = "/var/www/harness-landing"
$LocalDir = $PSScriptRoot

Write-Host "Uploading frontend to ${Remote}:${RemoteDir} ..."
ssh $Remote "mkdir -p $RemoteDir"
scp -r `
  "$LocalDir\index.html" `
  "$LocalDir\styles.css" `
  "$LocalDir\main.js" `
  "$LocalDir\article" `
  "$LocalDir\templates" `
  "${Remote}:${RemoteDir}/"

ssh $Remote "rm -rf $RemoteDir/sosbike $RemoteDir/assets; chmod -R a+rX $RemoteDir && chown -R www-data:www-data $RemoteDir"
Write-Host "Done. URLs:"
Write-Host "  http://168.144.38.133:8093/"
Write-Host "  http://168.144.38.133:8093/article/"

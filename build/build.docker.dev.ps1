$RootDir = Split-Path -Parent $PSScriptRoot
$DockerDir = "$RootDir\build\docker"

docker-compose -f "$DockerDir/docker-compose.dev.yml" up --build -d
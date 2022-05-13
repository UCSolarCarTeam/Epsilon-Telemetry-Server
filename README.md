# Epsilon-Telemetry-Server

This repository contains the front end which is created using Angular.
The server is made in Node.js express. See respective READMEs for more details.

## Development Environment

Install pre-commit using the following:

Windows/Linux
```console
pip install pre-commit
pre-commit install
```

MacOS
```console
brew install pre-commit
pre-commit install
```

## Deploying to the server

SSH into the IP:

`ssh root@<server_ip_address>`

Refer to current manager for the server password.

`cd Epsilon-Telemetry-Server`

`git pull` and/or checkout to branch you want to deploy.

### For Database or Server Side changes
`cd server`

Server should first be killed.
Find the server process with:
```
pgrep node
kill <server_process_pid>
```

To remake the database:

```
sudo -u postgres dropdb epsilontelemetrydb
sudo -u postgres createdb epsilontelemetrydb
sudo -u postgres psql epsilontelemetrydb < migrate.psql
```

Start the server with:

`nohup npm run start >/dev/null &`

*End your ssh session with `exit`, otherwise the server will stop running.*

### For front end changes
```
cd web-app
ng build --prod
```
After this step you should have a `dist` folder in your repository.

Copy the contents of the `dist` folder to `/var/www/html/` so that the apache server will update the site

`cp dist/*  /var/www/html/ -rf`

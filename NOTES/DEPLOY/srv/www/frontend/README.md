# Terrafarm Remote Config

These instructions are for setting up the directory in which this README is located.

## Move to directory
```
cd /srv/www/frontend
```

## Set Ownership
```
sudo chown -R `whoami`:`id -gn` /srv/www/frontend
```

## Install
Once source code has been pushed and forwarded to this directory from our git hook,
we need to manually run our installation. This could be automated in the future.
```
npm install
```

## Environment Config
Copy the example configs to a new `.env` file.
```
cp .env.example .env
```
Manually enter any missing environment config values. Check [here][./.env] or
ask another developer.

## Build
Builds are manually executed. This could be automated in the future. It is good
practice to run tests before building.
```
npm run test
npm run build
```

## Start
Run the app start script.
```
npm run start
```

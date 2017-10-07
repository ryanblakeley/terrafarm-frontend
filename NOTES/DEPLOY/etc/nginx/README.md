# Terrafarm Remote Config

These instructions are for setting up the directory in which this README is located.

See nginx portion of [tutorial][1].

## Nginx server config
```
sudo apt-get update
sudo apt-get install nginx
cd /etc/nginx/sites-available
sudo vi default
```

Testing for syntax errors:
```
sudo nginx -t
```

Restarting nginx:
```
sudo systemctl restart nginx
```

[1]: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#set-up-nginx-as-a-reverse-proxy-server

## Firewall config

Be sure that firewall settings allow connections from the reverse proxy server.

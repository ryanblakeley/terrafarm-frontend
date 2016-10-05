# Terrafarm Frontend Software Documentation

## Digital Ocean

Hosting on Digital Ocean. This covers setting up our Digital Ocean "droplets".

## Create a new droplet

Create a droplet with an Ubuntu distribution.
- Make note of the datacenter region. The same region will need to be used for
the app server that the reverse proxy will talk to.
- Select the option for __Private networking__
- Select the option to add an __SSH key__
- Name this server __reverse-proxy__

## Set up the reverse-proxy server

1. [Initial Server Setup with Ubuntu 16.04][1]
2. [Install Nginx on Ubuntu 16.04][2]
3. [Set Up Nginx as a Reverse Proxy Server][3]

[1]: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04
[2]: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04
[3]: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#set-up-nginx-as-a-reverse-proxy-server

## Set up the frontend app server

- [Set Up a Node.js Application for Production on Ubuntu 16.04][4]

[4]: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

## Set up the database server

**Work in progress. Documentation will soon follow.**

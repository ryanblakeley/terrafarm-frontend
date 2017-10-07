# Terrafarm Frontend Deploy

## Create a new droplet

Create a droplet with an Ubuntu distribution.
- Make note of the datacenter region. The same region will need to be used for the app server that the reverse proxy will talk to.
- Select the option for __Private networking__
- Select the option to add an __SSH key__
- Name this server __frontend__

## Set up the frontend server

1. [Initial Server Setup with Ubuntu 16.04][1]
2. [Install NVM and Node.js][4]
3. Install Git: `sudo apt-get install git`

[1]: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04
[4]: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04#how-to-install-using-nvm

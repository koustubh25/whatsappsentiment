#
# Ubuntu Node.js Dockerfile
#
# https://github.com/dockerfile/ubuntu/blob/master/Dockerfile
# https://docs.docker.com/examples/nodejs_web_app/
#

# Pull base image.
FROM ubuntu:16.04

# Install Node.js
RUN apt-get update
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832
COPY . /tmp

# Install app dependencies
RUN cd /tmp && npm install && http-server . -p 8083 &
RUN  cd /tmp && node index.js &

# Binds to port 8083
EXPOSE  8082 8083

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
#CMD ["node", "/src/index.js"]
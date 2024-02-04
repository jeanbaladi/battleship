FROM node:20-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY ./ ./
RUN npm i
RUN npm run build

# Set the base image
FROM debian:bullseye-slim

RUN apt-get update \
    && apt-get install -y apache2 curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs \
    && apt-get clean \
    && apt-get autoremove \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/src/app/dist/battleships/ /var/www/battleship-front/public

RUN echo "ServerName battleship-front" >> /etc/apache2/apache2.conf
# Copy over the apache configuration file and enable the site
COPY ./battleship-front.conf /etc/apache2/sites-available/battleship-front.conf
# Copy over the wsgi file, run.py and the app



RUN a2dissite 000-default.conf
RUN a2ensite battleship-front.conf
RUN a2enmod headers

#nameserver
#RUN echo "hostname_ejemplo" > /etc/hostname
#RUN hostname -F /etc/hostname

# LINK apache config to docker logs.
RUN ln -sf /proc/self/fd/1 /var/log/apache2/access.log && \
    ln -sf /proc/self/fd/1 /var/log/apache2/error.log

EXPOSE 8080



CMD  /usr/sbin/apache2ctl -D FOREGROUND

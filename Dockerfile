FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build

# stage 1, based on Nginx
FROM nginx
COPY --from=node /app/dist/battleships /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
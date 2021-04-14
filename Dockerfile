FROM node:14
WORKDIR ./var/www/sprint4
COPY . .
RUN npm install
RUN npm run prod:webpack
EXPOSE 5000
CMD [ "node", "server.js" ]

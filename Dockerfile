FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm install pm2 -g
RUN npm install @angular/cli@6.2.9 -g
RUN ng build --prod
CMD [ "pm2-runtime", "./server.js" ]
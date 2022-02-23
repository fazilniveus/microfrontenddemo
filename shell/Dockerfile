FROM node:12.18.3  as build-stage

WORKDIR /App

COPY package*.json /App/
RUN npm install
 
 
COPY ./ /App/
EXPOSE 6001
CMD [ "npm", "run","start" ]

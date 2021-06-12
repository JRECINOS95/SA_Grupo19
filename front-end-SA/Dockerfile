FROM node:10.16.0
RUN npm install -g serve
WORKDIR /App
ADD ./dist /App
#ADD . /App
#RUN npm install -P --progress=false
#RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", ".", "-p", "3000" ]
#CMD [ "npm", "run", "start" ]
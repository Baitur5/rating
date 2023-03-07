FROM node:10-alpine

RUN mkdir -p /home/ubuntu/rating/actions-runner/_work/rating/rating/node_modules && chown -R node:node /home/ubuntu/rating/actions-runner/_work/rating/rating

WORKDIR  /home/ubuntu/rating/actions-runner/_work/rating/rating

COPY package*.json ./ 

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]

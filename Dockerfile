FROM node:18-alpine

RUN mkdir -p /home/ubuntu/rating/actions-runner/_work/rating/rating/node_modules && chown -R $USER /home/ubuntu/rating/actions-runner/_work/rating/rating

WORKDIR  /home/ubuntu/rating/actions-runner/_work/rating/rating

COPY package*.json ./ 

USER node

RUN npm install

COPY --chown=$USER . .

EXPOSE 8080

CMD [ "node", "app.js" ]


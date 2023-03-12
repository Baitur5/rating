FROM node:17

WORKDIR  /home/ubuntu/rating/actions-runner/_work/rating/rating

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]


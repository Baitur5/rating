FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR  /home/ubuntu/rating/actions-runner/_work/rating/rating

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production 

COPY . .

CMD [ "node", "server.js" ]


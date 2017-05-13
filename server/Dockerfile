FROM node:alpine

ENV NODE_ENV production

WORKDIR /src
COPY . .
RUN cd /src; npm install

EXPOSE 4000

CMD ["npm", "start"]


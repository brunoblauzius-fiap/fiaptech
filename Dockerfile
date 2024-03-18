FROM node:18.18.2

WORKDIR /usr/src/apps

COPY package*.json ./
COPY tsconfig.json ./

#RUN npm install typescript
RUN npm install
RUN npm install typescript -g

COPY . /usr/src/apps

RUN tsc

EXPOSE 3000

CMD ["npm", "start"]

FROM node:22.16.0-alpine

WORKDIR /app

RUN npm install -g npm@10.9.2

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run db:generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

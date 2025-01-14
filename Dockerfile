FROM node:20

WORKDIR /usr/src

COPY package*.json ./

RUN npm install && \
    npm install -g @nestjs/cli

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
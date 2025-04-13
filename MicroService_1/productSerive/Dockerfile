FROM node

WORKDIR /app/productSerive

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm","start" ]
FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .babelrc.* ./
COPY webpack.config.js webpack.config.js
COPY src/ src/
RUN npm run build
RUN npm rebuild node-sass

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist dist
COPY package* ./
RUN npm i --production
ENV NODE_ENV=production
EXPOSE 7001
CMD ["npm","start"]
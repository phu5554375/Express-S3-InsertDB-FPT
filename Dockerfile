# FROM node:16-alpine
FROM node:18-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
EXPOSE 4000
CMD yarn start
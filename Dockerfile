FROM node:16.3.0-alpine AS prod

WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install

COPY . /app
RUN npm run build


FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=prod /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
FROM node:16.3.0-alpine AS prod

WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install -g npm
RUN npm install

COPY . /app
RUN npm run build


FROM umputun/nginx-le

ENV LETSENCRYPT=true
ENV LE_EMAIL=cool.groshelev@mail.ru
ENV LE_FQDN=publicapis.sunday-projects.ru

WORKDIR /usr/local/bin

COPY --from=prod /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/service.conf
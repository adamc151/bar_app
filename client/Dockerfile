FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
ARG api_key=defaultkey
ENV REACT_APP_GOOGLEAPIKEY=${api_key}
ARG hh_header=defaultheader
ENV REACT_APP_HH_HEADER=${hh_header}
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
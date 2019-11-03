# --- stage 1: build the final bundle --- #
FROM node:8 as react-app

WORKDIR /recipes-ui

ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_TIMEOUT
ARG REACT_APP_DEFAULT_PAGE_SIZE

COPY package.json ./recipes-ui/
COPY yarn.lock ./recipes-ui/
RUN yarn

COPY . /recipes-ui
RUN yarn build


# --- stage 2: serve the bundle through nginx --- #
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-app /recipes-ui/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
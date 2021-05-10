FROM node:current as builder

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

FROM node:current

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

RUN yarn build

CMD yarn start
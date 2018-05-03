FROM node:6.14.1

RUN mkdir /workspace
WORKDIR /workspace
copy . /workspace
ENV NODE_ENV production
RUN npm install && npm run build
EXPOSE 3000
CMD npm run start
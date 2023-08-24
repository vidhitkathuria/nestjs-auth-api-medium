FROM node:latest
WORKDIR /
COPY package*.json tsconfig*.json /
RUN npm install
COPY . .
RUN ls
EXPOSE 3000
CMD ["npm", "start"]
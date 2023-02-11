FROM node:16-alpine
COPY . /app
WORKDIR /app
# COPY package.json/ ./
# COPY package-lock.json ./
COPY ./ ./
RUN rm -rf /app/node_modules
# RUN npm install --legacy-peer-deps
RUN npm install
RUN npm run build
CMD npm run start

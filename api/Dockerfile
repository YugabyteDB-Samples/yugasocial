FROM node:16-alpine
COPY . /app
WORKDIR /app
COPY package.json/ ./
# COPY package-lock.json ./
COPY ./ ./

RUN npm install
RUN apk update && apk add bash
RUN apk add postgresql-client

# Add entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint
RUN printenv
ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
CMD []
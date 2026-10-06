FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=optional

COPY . .

# Keep the container's Linux node_modules when the project is bind-mounted over /app
VOLUME /app/node_modules

EXPOSE 5173

CMD ["npm", "run", "dev"]

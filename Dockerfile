# client/Dockerfile

FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Install a simple web server to serve the built static files
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]
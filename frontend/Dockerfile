# Use Node.js for building the React app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build production-ready frontend files
RUN npm run build

# Use lightweight web server to serve static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

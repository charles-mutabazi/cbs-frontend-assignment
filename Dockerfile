# Use the node image from official Docker Hub
FROM node:21.6.1 as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the Vue.js application in production mode to the dist folder
RUN npm run build

# Development Stage
FROM node:21.6.1 as dev-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port for the development server
EXPOSE 8080

# Start the Vue.js development server
CMD ["npm", "run", "dev"]

# Production Stage
FROM nginx:stable-alpine as production-stage

# Copy the built application from the previous stage to the Nginx container
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]

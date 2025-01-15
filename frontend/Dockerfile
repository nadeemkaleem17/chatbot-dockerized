# Use the official Node.js image for building
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx image to serve the build files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port used by Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

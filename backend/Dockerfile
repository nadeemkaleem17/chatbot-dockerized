# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy server.js and db.json
COPY server.js .
COPY db.json ./

# Expose the port used by your server
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

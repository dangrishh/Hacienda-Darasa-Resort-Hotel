# Use Node.js LTS as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install && npm install -g nodemon typescript

# Copy the rest of the project files
COPY . .

# Ensure TypeScript compiles before running
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the backend server with nodemon
CMD ["npx", "nodemon", "--watch", "dist", "--ext", "js,json", "--exec", "node", "dist/server.js"]

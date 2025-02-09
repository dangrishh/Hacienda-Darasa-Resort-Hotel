# Use Node.js LTS as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build TypeScript if needed
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the backend server
CMD ["node", "dist/server.js"]

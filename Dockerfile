# Base image for pulling the latest official Node.js image from Docker Hub
FROM node:latest

# Create directory name inside container '-p' flag ensure that directory is created if it doesn't already exist.
RUN mkdir -p /app

# Set working directory inside container
WORKDIR /app

# Copy current local directory to /app which current directory in container
COPY . .

# Install all dependencies in package.json
RUN npm install

# Used for applications that need to be compiled before run
RUN npm run build

# Expose the port on which your NextJS application will run (change as per your application)
EXPOSE 3000

# Run application when the container starts
CMD ["npm", "start"]
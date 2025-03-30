# Use the official Node.js image as a base
FROM node:22.13.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your backend runs on (change if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

#should run by my colleagues
# docker build -t my-app .
# docker run --env-file .env -p 5000:3000 my-app

#docker pull your-dockerhub-username/my-app
# docker run --env-file .env -p 3000:3000 your-dockerhub-username/my-app



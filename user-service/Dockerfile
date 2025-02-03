# Set the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other project files
COPY . .

RUN npm run build

# Expose the port the app will run on
EXPOSE 4002

# Command to run the app
CMD ["npm", "start"]

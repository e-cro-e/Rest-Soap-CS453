#made by Ethan A. :)

#Keep Node up to date
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the project files to the working directory in the container
COPY . .

# Expose the ports for both REST and SOAP servers
EXPOSE 3000
EXPOSE 8000

# Run the server.js file when the container starts
CMD ["node", "server.js", "soap-server.js"]

#made by Ethan A. :)
FROM node:18-alpine

# Set the working directory
WORKDIR /src

# Copy the local node_modules directory first (make sure to have node_modules in your .dockerignore if you don't want to copy it each time)
COPY node_modules/ ./node_modules/

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Copy the rest of the project files
COPY . .

# Expose the desired port
EXPOSE 3000

# Run the application using npm, which should run the "dev" script defined in package.json
CMD ["node", "--max-old-space-size=1024", "-r", "ts-node/register", "src/index.ts"]
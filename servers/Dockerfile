# Use a lightweight Node.js image as the base
FROM node:alpine AS builder

# Set the working directory for the build stage
WORKDIR /servers

# Copy the application code from the current directory
COPY package*.json ./
RUN npm install --production

# Create a separate image for the final application (optional)
FROM node:alpine

# Copy only the necessary files for a smaller image
COPY --from=builder /servers/node_modules /servers/node_modules
COPY . .

# Install nodemon globally in the container (optional)
RUN npm install -g nodemon
RUN npm install express
RUN npm install multer
RUN npm install cors
RUN npm install csv-parser

# Expose the port your application listens on (replace 3000 with your actual port)
EXPOSE 3000

# Start the application using nodemon for development
CMD [ "nodemon", "-L", "app.js" ]  # Adjust the command and arguments as needed

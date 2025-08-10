#!/bin/bash

# Build the Next.js application
echo "Building the Next.js application..."
npm run build

# Start the application in production mode
echo "Starting the application in production mode..."
npm start -- -p 12000 --hostname 0.0.0.0
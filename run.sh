#! /bin/bash

cd cat-shark-carousel
if [ ! -d "node_modules" ]; then
  # Install node_modules if it doesn't exist
  npm install
fi
npm run build

cd ..

cd cat-shark-carousel-server
if [ ! -d "node_modules" ]; then
  # Install node_modules if it doesn't exist
  npm install
fi
npm run build

mv ../cat-shark-carousel/build ./dist

# Run the server
npm run serve
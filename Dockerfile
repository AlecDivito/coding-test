# Pull in the latest node package, this will be used to build CRA
FROM node:latest AS build

WORKDIR /app

# Copy the package.json and lock first so that when re-building the image it
# can go faster. This happens because each line in this file is a layer so if
# docker sees that there hasn't been a change, it skips the line.
COPY ./cat-shark-carousel/package.json ./app
COPY ./cat-shark-carousel/package-lock.json ./app

RUN npm install

COPY ./cat-shark-carousel/ .

RUN npm run build

# Once CRA has been built, we can setup the server and serve the applications
FROM node:alpine

WORKDIR /app

# Read the above comment on why we do this
COPY ./cat-shark-carousel-server/package.json ./app
COPY ./cat-shark-carousel-server/package-lock.json ./app

RUN npm install

COPY ./cat-shark-carousel-server ./app

COPY --from=build /app/build/ /app/build

RUN tsc ./src/index.ts --esModuleInterop true -outDir dist

CMD ["npm", "run", "serve"] 



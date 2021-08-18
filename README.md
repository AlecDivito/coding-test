# Completed Coding Test

The coding test is divided into 2 repositories, the [cat-shark-carousel](./cat-shark-carousel)
and the [cat-shark-carousel-server](./cat-shark-carousel-server). The non server
repo contains the frontend which was build from use create-react-app. The backend
uses the required express application.

## Development

For development, open 2 command prompts and `cd` into [cat-shark-carousel](./cat-shark-carousel)
and [cat-shark-carousel-server](./cat-shark-carousel-server). In the frontend,
run: `npm run start`. In the backend run the following two commands:

1. npm run build
2. npm run serve

The backend doesn't refresh, so when you make changes to it, you need to stop it
and restart it again.

Also for development, there are tests on the frontend. To run them, execute the
follow: `npm run test`.

## Run Locally

To run the application, just run `./run.sh`. Remember to give the correct file
permissions for the script run (hint: `chmod 755 ./run.sh`).

## Docker Container

To build the container, run the following: `docker build .`. This will build our
docker container. We're using a multi-stage build process to build the frontend
and copy the contents of the build folder to the server.

Once the image has build, run a quick `docker images` to get a list of the current
images you have and the top most one will be the one you need to build. Run the
following in your command line: `docker run -p 80:3000 <image-id-here>`. You will
now be able to access the app from [http://localhost](http://localhost)

## Ownr Developer Candidate Coding Test

Congratulations, you have been asked to complete our Full Stack candidate proficiency test! 

You will have **48 hours** starting when you receive this test to return the full working source code as a Pull Request against a fork of this repository. Please thoroughly read the attached set of instructions. You will be creating a mini web app that uses React, Node & Express. This app will consist of a backend Express server that will deliver a React app to be rendered in the browser. The app that you will be building is a simple image carousel that allows the user to pick between cat or
shark photos and then cycle through those photos. An example of a running version of this can be seen here:
https://founded.media/hiring/videos/cat-shark-app.mp4

If you have any questions, require further details or get stuck please do not hesitate to contact Hugh Soong (hugh.soong@rbc.com).

## Requirements

The Express server, besides delivering whats required for React, should also provide an API endpoint that will return one of 3 possible lists of photo URLs (please see attached lists). Your React app should make a request to your API endpoint to retrieve a photo list. During this request the React app should show a loading state. Once the photo list has been retrieved the loading state should dismiss and the first photo should be shown. The user should now be able to cycle through the photos using left and right arrow buttons. The user can use the UI to toggle between cat photos, shark photos, or both (when both selected they should arrive in a random order). After each change to the desired list the loading state should be shown just like during the initial load and a new request to the photo API endpoint should be made (i.e. Do not cache the photo lists).

### Do

- Be mindful of when to use props vs. state vs. Hooks vs. Context
- Be RESTful
- ES6+
- Use JS best practices
- Be creative

### Don't

- Use 3rd party image carousels (also - try to avoid 3rd party component libraries unless you are tight on time)
- Over think the problem, there's no trick here

### BONUS

- Show off some cool CSS
- Unit tests
- Add other useful features

## Photo Lists

```
const sharksList = [
 'https://founded.media/hiring/photos/sharks/11261840124_dc9ac72bbe_b.jpg',
 'https://founded.media/hiring/photos/sharks/513197047_2f861d56cb_b.jpg',
 'https://founded.media/hiring/photos/sharks/2989909952_b59500107e_o.jpg',
 'https://founded.media/hiring/photos/sharks/4107884442_3baf8985f2_b.jpg',
 'https://founded.media/hiring/photos/sharks/3822452418_ffa66da89d_o.jpg',
 'https://founded.media/hiring/photos/sharks/3800013954_20fea3a9c9_b.jpg',
 'https://founded.media/hiring/photos/sharks/7109693941_250fc6b246_k.jpg',
 'https://founded.media/hiring/photos/sharks/8592704407_75c3c7ff53_h.jpg',
 'https://founded.media/hiring/photos/sharks/14730744390_cebc28aa86_k.jpg',
 'https://founded.media/hiring/photos/sharks/4936728723_91da549b05_b.jpg',
];
const catsList = [
 'https://founded.media/hiring/photos/cats/14157413946_fea785b4d6_k.jpg',
 'https://founded.media/hiring/photos/cats/16175483119_bd7374d8a8_h.jpg',
 'https://founded.media/hiring/photos/cats/13901304865_a444cf4d34_k.jpg',
 'https://founded.media/hiring/photos/cats/8311701653_49ed80202c_k.jpg',
 'https://founded.media/hiring/photos/cats/13336301695_3c06dd41cc_k.jpg',
 'https://founded.media/hiring/photos/cats/38679744435_66279af67c_k.jpg',
 'https://founded.media/hiring/photos/cats/6393395037_9cda69da1a_b.jpg',
 'https://founded.media/hiring/photos/cats/6977309082_44102ddf51_b.jpg',
 'https://founded.media/hiring/photos/cats/11477923503_bbdf86387d_b.jpg',
 'https://founded.media/hiring/photos/cats/4481336172_7f464f180d_b.jpg'
];
```

## Instructions

### Getting started

- Fork or clone this repository
- Complete the assignment in a separate branch in your version of the repository

### Submission
There are several ways to submit your completed assignment:

#### PR Method (Preferred)
- Create a PR for `your new branch` -> `master` **in your own repository**
- Do not PR in this repository
- Email hugh.soong@rbc.com with a link to the PR

#### Zip Method
- Zip your completed code
- Email it to hugh.soong@rbc.com

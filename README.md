# Plate Guesser

Do you think you should work for the DMV? Play this game and find out! Decide, based on the license plate, the customer's reason, and your own wits, if the California DMV **approved** or **denied** the plate. Additionally, enable (or disable) the DMV's own comments for help.

Play either Arcade mode, where you can play freely, or Ranked mode, where your score is put on the leaderboard (Top 50 shown only!), and just have fun!

If you want to support this game, just play it or send it to your friends.

## About

I saw a CSV file of a bunch of license plate applications (see below), and thought, *wouldn't that be a cool game?* And here I am, having made it. I also used this to relearn React.js and TailwindCSS (which is what this project is built from).

## Credits

- ![CSV File - Veltman's Github](https://github.com/veltman/ca-license-plates)
- ![Button Design - helped to pull the theme together - Flowbite.com](https://flowbite.com/docs/components/buttons/)

## How to Play

This is a self-contained app, but requires ![Node.js](https://nodejs.org/en/) and ![NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). To start, clone the repository. Then, open the repository's directory on your computer and type `npm install`. After everything is done installing, you need to create the `.env` (with that name) in the `plateguesser` directory. In it, paste this (and make sure to fill out the \<anything here> string):

```md
REACT_APP_SERVER_ROUTE="http://localhost:3001"
REACT_APP_SERVER_TOKEN="<anything here>"
```

(The SERVER_ROUTE is by default localhost:3001 since the game runs on localhost:3000)

After this, run the command `npm run play` to start the server AND the game. Note that this runs the development version. To play the build, you need to run `npm run build` to create a bundle and then start the server separately by running `npm run server`. Have fun!
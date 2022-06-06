# Idle Programmer (Clicker Jam Summer 2022 Submission)

![License](https://img.shields.io/badge/license-MIT-green)

Play the game on Itch.io here: <a href="https://galemius.itch.io/idle-programmer" target="_blank">Idle Programmer</a>

This is a game that I created as part of the <a href="https://itch.io/jam/clicker-jam-summer-2022" target="_blank">Clicker Jam Summer 2022</a> game jam. The game was created using <a href="https://phaser.io/" target="_blank">Phaser 3</a> and <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>.

<p align="center">
  <img src="./.github/image1.png?raw=true" height="300" title="Title Screen">
  <img src="./.github/image2.png?raw=true" height="300" alt="Gameplay Screenshot">
  <img src="./.github/image3.png?raw=true" height="300" alt="Gameplay Screenshot 2">
</p>

This game is a simple idle clicker were your goal is to get to the highest level possible by gaining developer experience. You can then use this experience to increase your task progress per second (TPPS). As you complete more and more levels, each level will become more difficult to complete, and you will need to increase your TPPS!

*How To Play*: Keep clicking on the monitor to complete the code required for the current task. Once you have completed the current task a new one will be assigned to you, and you will need to complete that task. Once you have completed all 10 tasks in a sprint, you will be able to proceed to the next sprint!

As you complete tasks, you will gain experience. You can then use this experience by buying upgrades in the game. To buy upgrades, click on the Upgrade Menu button. In the menu, there are three upgrade. The first upgrade will improve your developer skills, which means you will complete tasks faster! The next two upgrades will allow you to employ others and automation's to help you complete tasks.

Finally, to save your progress, you will need to click on the save icon in the top left hand corner.

*Note:* This game uses the browser local storage for saving data, and the game relies on manual saves. There is no support for automatic saving at this time. If you save your data, the next time you visit the game, when the game starts it will load your data from thee local browser storage.

The following assets were used in the creation of this game:
- <a href="https://textcraft.net/" target="_blank">Title Image Generated with Textcraft</a>
- <a href="https://www.kenney.nl/assets/game-icons" target="_blank">Game Icons: Kennys Assets</a>
- <a href="https://www.kenney.nl/assets/ui-pack-space-expansion" target="_blank">UI: Kennys Assets</a>
- <a href="https://anjuu.itch.io/1bit-controller" target="_blank">UI: keyboard and mouse</a>
- <a href="https://www.fesliyanstudios.com/royalty-free-music/download/8-bit-surf/568" target="_blank">Background Audio: fesliyanstudios</a>

The logic for the level progression, upgrade costs, and automation is based on the math formulas from the hit game Clicker Heroes. More details on the formulas can be found here: <a href="https://clickerheroes.fandom.com/wiki/Formulas" target="_blank">Clicker Heroes Wiki</a>.

## Running The Project Locally

### Requirements

[Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com/) are required to install dependencies and run scripts via `yarn`.

[Vite](https://vitejs.dev/) is required to bundle and serve the web application. This is included as part of the projects dev dependencies.

### Available Commands

| Command | Description |
|---------|-------------|
| `yarn install --frozen-lockfile` | Install project dependencies |
| `yarn start` | Build project and open web server running project |
| `yarn build` | Builds code bundle for production |
| `yarn lint` | Uses ESLint to lint code |
| `yarn version` | Updates the project version and the changelog file |

### Writing Code

After cloning the repo, run `yarn install --frozen-lockfile` from your project directory. Then, you can start the local development
server by running `yarn start`.

After starting the development server with `yarn start`, you can edit any files in the `src` folder
and parcel will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

### Deploying Code

After you run the `yarn build` command, your code will be built into a single bundle located at
`dist/*` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://myserver.com`),
you should be able to open `http://myserver.com/index.html` and play your game.

### Linting

This project uses `typescript-eslint` for linting, and it has been setup to extend the [airbnb](https://github.com/airbnb/javascript) style guide. To modify these settings, you will need to update the `./config/.eslintrc` file with your plugins, rules, etc.

### Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served at `http://localhost:8080/path-to-file-your-file/file-name.file-type`.

## Changelog

This project uses [auto-changelog](https://github.com/CookPete/auto-changelog) for maintaining the changelog. You can view the Changelog here: [Changelog](CHANGELOG.md).

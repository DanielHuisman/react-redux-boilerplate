# react-redux-boilerplate

Boilerplate for React + Router + Redux + Webpack + Hot Loader. Highly opinionated as it's intended for personal use.

## Installation
Follow these instructions or alternatively copy all files from this boilerplate to your new project.
```bash
# Shallow clone this repository
git clone --depth 1 https://github.com/DanielHuisman/react-redux-boilerplate my-project
cd my-project

# Re-initialize the Git repository
rm -r .git
git init

# Add your project's Git remote
git remote add origin https://github.com/my-group/my-project

# Change the default settings
nano package.json
nano .env.client.example
nano .env.server.example

# Install the dependencies
yarn

# Commit the boilerplate
git add -A
git commit -m "Initial commit"
git push --set-upstream origin master
```

## Usage
### Development
#### Linting
This boilerplate comes with a preconfigured ESLint installation. Most editors (e.g. Atom) have plugins for ESLint, but you can also use the command line:
```bash
yarn run lint
```

#### Running
This boilerplate supports hot reloading, but you can also follow the production instructions if you want manual control over restarts.
```bash
# Start webpack development server with hot reloading
yarn run dev
```

### Production
#### Using npm
```bash
# Build the application
yarn run build
# Start the application
yarn run start
```

#### Using a process manager
Alternatively you can use a process manager, like [PM2](https://github.com/Unitech/pm2) or [Forever](https://github.com/foreverjs/forever), to start and monitor this application. For example:
```bash
# Build the application
yarn run build
# Start the application using PM2
pm2 start --name my-project index.js
```

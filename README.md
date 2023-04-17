
# heartbit-wallet-server
HeartBit wallet server

## Features

- Bitcoin wallet for user
- User Health Data


## Getting started 🐣
#### Dependencies

 - Requires [npm](https://www.npmjs.com/)
 - Requires [MongoDB](https://www.mongodb.com/)

First, setup Mongodb on your local or remote instance and obtain the connection url.

Rename `.env.example` to `.env` and populate the parameters.

You can use [NVM](https://github.com/nvm-sh/nvm) to install Node before proceeding to start the application by running the following commands:

```bash
# Run this to install Node 19.6.1
nvm install 19.6.1

# Run this to use the installed Node version 
nvm use 19.6.1

# clone the codebase to a directory

git clone git@github.com:heartbit-io/heartbit-wallet-server.git .

# cd into the directory and run the command
npm install


# start the application
npm run dev
```

## Deploy 

You can easily deploy this application to any server. 

To deploy:

```bash
npm run build

# deploy ./build path

# then start the server
npm run start
```

## Contribute 🚀

We welcome contributors to the project. Please note that:

- Before opening a pull request, please create an issue to discuss the scope of your proposal
- Please write simple code and concise documentation, when appropriate.

## License 📗

[MIT License](./LICENSE) 


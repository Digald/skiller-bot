# skiller-bot
A custom discord bot for my friend's personal discord server. The bot's functionality is simple at the moment but may have more uses in the future depending on our needs. As of right now, the bot is only used for fun and doesn't really have any admin permissions.

## Getting Started

### Prerequisites

You must make an account through the Discord developer portal and have a personal account for yourself to test the bot out in the client.

You will also need a few tokens to get this particular bot functioning. You will have to make a .env file or something similar to keep this information secret.

/.env
```
BOT_TOKEN=provided from discord developer portal
IMGUR_ID=made by registering with Imgur developer
IMGUR_SECRET=made by registering with Imgur developer
```

### Installing

Install dependencies.

```
npm install
```
Run start command.

```
npm start
```
and that should be it! 

![Command line when logged in](https://i.gyazo.com/25525ae7da65a9b1ca947d8affa856eb.png)

![Showing my bot online](https://i.gyazo.com/9e248ae299f26f19311913740920e9bd.png)

Start with typing a command to get started in your text channel or private message.

```
!help
```

## Running the tests

I haven't developed any test for the bot yet but that is something I want to tackle in the near future. I have jest set up so far.

To run jest tests type,
```
npm test
```

## Deployment

Getting deployed is a work in progress.

## Built With

* [Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) - Library for connecting and using Discord with your bot

## Authors

* **Mark Alaniz**

## Acknowledgments

* Thanks to my discord bros for some of the functionality ideas. I'm always open to more suggestions

## Status
Skiller-bot is still a work in progress but currently working on being deployed.
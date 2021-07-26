# DevHub

Social media app for developers to connect and chat

## Tech

#### Front-end

ReactJS, Redux, MaterializeCSS, SASS

#### Backend

Node, Express, Mongoose, JWT, API calls to GitHub and Gravatar

#### Deployment

Client and server hosted on Heroku, MongoDB hosted on atlas

---

## Setup

#### - Clone repo and cd into project root

#### - Add a .env with the following:

```
MONGO_URI="<your_mongoDB_Atlas_uri_with_credentials>"
JWT_SECRET=yoursecret
GITHUB_TOKEN=yourgithubaccesstoken
```

#### Install server dependencies

```bash
npm install
```

#### Install client dependencies

```bash
cd client
npm install
```

#### Run both Express & React from root

```bash
npm run dev
```

#### Build for production

```bash
cd client
npm run build
```

#### Test production before deploy

After running a build in the client, cd into the root of the project.  
And run...

Linux/Unix

```bash
NODE_ENV=production node server.js
```

Windows Cmd Prompt or Powershell

```bash
$env:NODE_ENV="production"
node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

## Deploy

Download and [install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Create your Heroku project

```bash
heroku create
```

Go to your newly created Heroku app and [configure your environment variables](https://devcenter.heroku.com/articles/config-vars)

Now Heroku will have the config it needs to build the project.

Add a Heroku branch with your unique heroku app id

```
heroku git:remote -a random-heroku-61413
```

Push your branch to deploy

```bash
git push heroku <yourbranch>:main
```

> **Don't forget to make sure your production database is not whitelisted in MongoDB Atlas, otherwise the database connection will fail and your app will crash.**

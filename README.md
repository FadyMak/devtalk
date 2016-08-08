# DevTalk
Markdown-based discussion platform, powered by Auth0 Lock and Webtask

Check out the [demo](http://fadymak.com/devtalk/)

## Rationale

Disqus does a great job at providing a commenting platform as a service. While it serves most blog's and website's requirements just fine, it falls short when it comes to formatting your comments. For instance:

- Developers can't easily insert code snippets with syntax highlighting in their desired language
- HTML is too verbose for simple styling (bold, italicize, link, etc...)
- Writing comments in HTML is prone to minor mistakes (missing a closing tag, incorrect nesting)

I believe that a commenting system should enable communication and this is especially true when it comes to discussing code in development blogs and sites. For this reason I decided to leverage [Webtask](https://webtask.io), [Auth0 Lock](https://auth0.com/lock), [mLab](https://mlab.com), and [Vue.js](http://vuejs.org/) to build a Markdown-powered commenting system that can be easily dropped into any **static** site.


## Prerequisites

You will need:

- [Auth0](https://auth0.com/) account to handle authentication
- [Webtask](https://webtask.io/) account to handle requests from the client and read/write to the Mongo Database
- [mLab](https://mlab.com) account to use MongoDB as a hosted service

#### Setup the Auth0 Client

- Create an Auth0 client (Single Page Application) and note down the `Client ID` and `domain`
- In the settings for this client, add `http://localhost:8080` to the *Allowed Callback URLs* section to enable CORS during development on the Webpack Dev Server

#### Setup the MongoDB

- Create an mLab account
- Create a collection named `comments`
- Create a database user
- Note down the MongoDB URI: `mongodb://<dbuser>:<dbpassword>@ds145325.mlab.com:45325/<your_db>`

#### Setup the Webtask

- Login to Webtask and follow steps 1 and 2 here: https://webtask.io/cli
- Create the webtask: `wt create --secret MONGO_URL=<your_mongodb_uri> devtalk-webtask.js`
- Take note of the webtask URL (i.e: https://webtask.it.auth0.com/api/run/<your_account>/devtalk-webtask?webtask_no_cache=1)

## Usage

1. Clone this repository
2. Run `npm install`
3. Update `WEBTASK_URL` in `utils/webtask-api.js` with your Webtask URL
4. Update `clientId` and `domain` in `utils/auth-service.js` with the values you noted from the "Setup the Auth0 Client" section

To run the development server at `localhost:8080`:

```bash
npm run dev
```

To build an optimized bundle for production in `dist/`:

```bash
npm run build
```

# HID Puppeteer

Scripts to locally test HID Authorization process. Mostly for developer self-QA before submitting PRs.

## Installation / setup

```sh
npm i
cp config.example.js config.js
```

After creating `config.js` it will need to be populated with user credentials, plus OAuth client data that actually exists in your DB. Feel free to add the example client if you want to avoid redirecting to actual dev/stage sites.

Please don't use a prod client to test. It won't cause security problems, but the redirection will probably land you on a page that collects analytics for logins. No need to pollute our stats.


## Usage

```sh
node oauth-simple.js
```

The current config will display the Puppeteer window while the script executes, and it will only close the browser once you terminate the script manually in the console.

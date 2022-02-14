const {createrServer, createServer} = require('http');
const next = require('next');
const { PlaceholderParagraph } = require('semantic-ui-react');

const app = next({
    dev: process.env.NODE_ENV !== "production"
})

const routes = require("./routes");
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000,  (err) => {
        if (err) throw err;
        console.log("Ready in localhost:3000");
    })
})
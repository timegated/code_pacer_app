const express = require('express');
const session  = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const models = require('./models')
const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

require("./config/passport.js")(passport, app, session, models.User);


let uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/code_pacer';

// The http server will listen to an appropriate port, or default to
// port 5000.
const PORT = process.env.PORT || 3001;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, {useNewUrlParser: true}, (err, res) => {
    if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
        app.listen(PORT, () => {
            console.log(`App running http://localhost:${PORT}`);
        })
    }
});
const express = require('express');
const mongoose = require('module');
const dbconfig = require('./config/dbConfig');
const auth = require('./middleware/auth');
const erros = reqiure('./middleware/errors');
const unless = require('express-unless');
const app = express();

require('dotenv').config()


mongoose.promise = global.promise;
mongoose.connect(dbconfig.db, {
    userNewUrlParser: true,
    userUnifiedTopology: true
}).then(
    () => {
        console.log('db connected sucessufuly');

    }),
    (errors) => {
        console.log('Failed to connect to the db');
    };

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: ".users/login", methods: ["POST"] },
            { url: ".users/register", methods: ["POST"] }
        ],
    })
);
app.use(express.json());
app.use("/users", require("./routers/userRouters"));
app.use(errors.errorHandler);
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`)

})


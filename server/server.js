require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');

const routes = require('./controllers/routes')

app.use(session({
    secret: "staticSecret",
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)

app.listen(3000);
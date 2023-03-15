require('dotenv').config();
const express = require('express');
const app = express();

const routes = require('./controllers/routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)

app.listen(3000);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controlar/register');
const signin = require('./controlar/signin');
const profile = require('./controlar/profile');
const image = require('./controlar/image')


const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '0102326134',
    database : 'smart_brain'
  }
});


app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res)=>{res.send(`now working...`)})

app.post('/signin', (req,res)=>{signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})


app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image' , (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageapi' , (req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`done ${process.env.PORT}`);
})
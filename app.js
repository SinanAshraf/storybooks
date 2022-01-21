const express = require("express")
const dotenv = require("dotenv")
const morgan = require('morgan')
const path = require('path');
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const { engine } = require('express-handlebars')
const conectDB = require("./config/db")

//Load Config
dotenv.config({ path: './config/config.env' });

//passport config
require('./config/passport')(passport)

//Db Connect
conectDB();

const app = express();

//logging only in dev environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//handle bars
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

//Body parser MiddleWare
app.use(express.json());

//Form Submission MiddleWare
app.use(express.urlencoded({extended:false}));


//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/members', require('./routes/member'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT} `));

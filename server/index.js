require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const PORT =  process.env.PORT;

const connectMongoDB = require('./connection');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const listItemsRouter = require('./routes/listItems');
const listViewRouter = require('./routes/viewItems');
const ItemsRouter = require('./routes/Items');

// connection with MongoDB
connectMongoDB(process.env.MONGODB_URL)
.then(() => {console.log("MongoDB connected")})
.catch((err) => {console.log(err)});

//middleware
app.use(express.urlencoded({extended: false}));
// const restrictToLoggedInUser = require('./middlewares/auth');
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend origin
    methods: ['GET', 'POST'], // Allowable methods
}));


// ROUTES
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/profile',profileRouter);
app.use('/listItems',listItemsRouter);
app.use('/viewItems',listViewRouter);
app.use('/Items',ItemsRouter);

app.listen(PORT,()=>{
    console.log("Server is running");
})
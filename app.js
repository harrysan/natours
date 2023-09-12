const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // route in console
}

app.use(express.json());
//-- Read static files in public folder
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log('Hello from the middleware !')
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//-- Variable to store callback function
// 2) ROUTE HANDLERS

// Basic Route
//-- app.get('/api/v1/tours', getAllTours)
//-- app.get('/api/v1/tours/:id', getTour)
//-- app.post('/api/v1/tours', createTour)
//-- app.patch('/api/v1/tours/:id', updateTour)
//-- app.delete('/api/v1/tours/:id', deleteTour)

//-- Refactor Route Tour
// 3) ROUTES
app.use('/api/v1/tours', tourRouter); // Apply tourRouter middleware
app.use('/api/v1/users', userRouter); // Apply userRouter middleware

//-- Mounting the Router
//-- 3.1) TOUR ROUTES
//-- 3.2) USER ROUTES

// 4) START SERVER
module.exports = app;
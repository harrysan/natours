const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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

//--Handle Unhandled Routes
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl} on this server!`
    // })

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//--Error Handling Middleware
app.use(globalErrorHandler);

// 4) START SERVER
module.exports = app;
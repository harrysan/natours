const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARE
// Set Security HTTP headers
app.use(helmet());

// Development Logging
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // route in console
}

// Set Limit Requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP, please try again in an hour!"
});
// all routes start with /api
app.use('/api', limiter);

// Body Parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
);

//-- Read static files in public folder
app.use(express.static(`${__dirname}/public`))

// Test middleware
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
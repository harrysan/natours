const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// read variable on the files to node js env variables
dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD);

// mongoose
//     .connect(DB, {
//         //.connect(process.env.DATABASE_LOCAL, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }).then(() =>
//         //console.log(con.connection);
//         console.log('DB connection successfull!')
//     );

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

const x = 23;
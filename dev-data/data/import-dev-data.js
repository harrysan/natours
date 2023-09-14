const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

// read variable on the files to node js env variables
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        //.connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() =>
        //console.log(con.connection);
        console.log('DB connection successfull!')
    );

// Read JSON File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import Data into Database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    }
    catch (err) {
        console.log(err)
    }
    process.exit();
};

// Delete All Data From Collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    }
    catch (err) {
        console.log(err)
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);
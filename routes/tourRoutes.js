/* eslint-disable import/no-useless-path-segments */
/* eslint-disable prettier/prettier */
const express = require('express')
const tourController = require('./../controllers/tourController');

const router = express.Router();

// sub application middleware
router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
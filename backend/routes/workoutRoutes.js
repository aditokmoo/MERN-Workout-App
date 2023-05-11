const express = require('express');
const { getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controller/workoutController');

const router = express.Router();

// Get All Workouts
router.get('/', getAllWorkouts)

// Get Single Workout
router.get('/:id', getSingleWorkout)

// Post Workout
router.post('/', createWorkout)

// Delete Workout
router.delete('/:id', deleteWorkout)

// Update Workout
router.patch('/:id', updateWorkout)

module.exports = router;
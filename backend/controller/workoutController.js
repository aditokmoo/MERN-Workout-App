const { default: mongoose } = require('mongoose');
const Workout = require('../models/workoutModel');

// Get all workouts
const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id;

    console.log('GET' + user_id)

    const workout = await Workout.find({user_id}).sort({ createdAt: -1 });

    res.status(200).json(workout)
}

// Get Single Workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id);

    if(!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
}

// Create Workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!load) {
        emptyFields.push('load')
    }
    
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const user_id = req.user._id;

        console.log('POST' + user_id)

        const workout = await Workout.create({ title, reps, load, user_id });
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Delete Workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findByIdAndDelete(id);

    if(!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

// Update Workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findByIdAndUpdate({ _id: id }, {...req.body});

    if(!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
import {Task} from "../models/TaskModel.js";

export const createTask = async (req, res) => {
    const {title, description, category, user} = req.body;

    console.log(req.body);

    if (!title || !category || !user) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide the required fields'
        });
    }

    try {
        const newTask = new Task({
            title,
            description,
            category,
            user,
        });

        const result = await newTask.save();
        console.log(result);

        return res.status(201).json({
            status: 'success',
            data: result,
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating task',
            error: error.message
        });
    }
}


export const getUserTasks = async (req, res) => {
    const {user} = req.params;

    try {
        const tasks = await Task.find({user});
        return res.status(200).json({
            status: 'success',
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user tasks',
            error: error.message
        });
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error deleting task',
            error: error.message
        });
    }
}

export const updateTask = async (req, res) => {
    const {id} = req.params;

    try {
        const task = await Task.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });


        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: task
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error updating task',
            error: error.message
        });
    }
}
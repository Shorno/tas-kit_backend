import express from 'express';
import {createTask, deleteTask, getUserTasks, updateTask} from "../controllers/TaskControllers.js";

const router = express.Router();

router.post('/', createTask);
router.get('/:user', getUserTasks);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

export default router;

import express from 'express';
import {createTask, getUserTasks} from "../controllers/TaskControllers.js";

const router = express.Router();

router.post('/', createTask);
router.get('/:user', getUserTasks);

export default router;

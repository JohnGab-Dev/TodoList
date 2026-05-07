import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/roleVerify.js";
import { addTodo, signup, login, editTodo, deleteTodo, getTodos } from '../controllers/TodoController.js';

const router = express.Router();
    router.post('/signup', signup)
    router.post('/login', login)

    router.get('/getTodos', verifyToken, getTodos)
    router.post('/addTodo', verifyToken, addTodo)
    router.post('/editTodo', verifyToken, editTodo)
    router.post('/deleteTodo', verifyToken, deleteTodo)

// router.post('/users/update', verifyToken, authorizeRoles("superadmin"), updateUser);
// router.get('/users/search', verifyToken, authorizeRoles("superadmin"), searchUser);

export default router;
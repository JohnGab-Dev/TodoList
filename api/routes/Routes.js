import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRoles } from "../middleware/roleVerify.js";
import { login, signup } from '../controllers/TodoController.js';

const router = express.Router();

    router.post('/login', login)
    router.post('signup', signup)
    

// router.get('/admin-dashboard', verifyToken, authorizeRoles("superadmin"), getDashboardData);
// router.get('/users', verifyToken, authorizeRoles("superadmin"), getUsersData);
// router.post('/users/add', verifyToken, authorizeRoles("superadmin"), addUser);
// router.post('/users/delete', verifyToken, authorizeRoles("superadmin"), deleteUser);
// router.post('/users/update', verifyToken, authorizeRoles("superadmin"), updateUser);
// router.get('/users/search', verifyToken, authorizeRoles("superadmin"), searchUser);

export default router;
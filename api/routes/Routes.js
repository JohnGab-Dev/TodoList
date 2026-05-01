import express from 'express';
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getDashboardData, getUsersData, addUser, deleteUser, updateUser, searchUser } from '../controllers/superAdminController.js';

const router = express.Router();

// router.get('/admin-dashboard', verifyToken, authorizeRoles("superadmin"), getDashboardData);
// router.get('/users', verifyToken, authorizeRoles("superadmin"), getUsersData);
// router.post('/users/add', verifyToken, authorizeRoles("superadmin"), addUser);
// router.post('/users/delete', verifyToken, authorizeRoles("superadmin"), deleteUser);
// router.post('/users/update', verifyToken, authorizeRoles("superadmin"), updateUser);
// router.get('/users/search', verifyToken, authorizeRoles("superadmin"), searchUser);

export default router;
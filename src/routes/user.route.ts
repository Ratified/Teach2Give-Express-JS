import { createUser, getSingleUser, updateUser, deleteUser } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

//Create user
router.post('/', createUser);

// Get single user
router.get('/:id', getSingleUser);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);   


export default router;
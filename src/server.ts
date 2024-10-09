import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { getXataClient } from './xata';

const app = express();
const PORT = 5000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Middleware
dotenv.config();
const xata = getXataClient();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CREATE: Add a new user
app.post('/api/users', async (req: Request, res: Response) => {
    try {
        const { username, displayName } = req.body;

        const newUser = await xata.db.users.create({
            username,
            displayName,
        });

        res.status(201).json({
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// READ: Get all users
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const users = await xata.db.users.getAll();

        res.status(200).json({
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// READ: Get a single user by ID
app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await xata.db.users.read(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// UPDATE: Update a user by ID
app.put('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, displayName } = req.body;

        const updatedUser = await xata.db.users.update(id, {
            username,
            displayName,
        });

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// DELETE: Delete a user by ID
app.delete('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await xata.db.users.delete(id);

        res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
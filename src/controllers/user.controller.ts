import { Request, Response } from "express";
import { getXataClient } from "../xata";

const xata = getXataClient();

// Add new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, displayName } = req.body;

    const newUser = await xata.db.users.create({
      username,
      displayName,
    });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Get a single user by ID
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await xata.db.users.read(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, displayName } = req.body;

    const updatedUser = await xata.db.users.update(id, {
      username,
      displayName,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
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
}

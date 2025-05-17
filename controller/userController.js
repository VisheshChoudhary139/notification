import User from "../model/userModel.js";

export const create = async (req, res) => {
    try {
        const { email } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        const newUser = new User(req.body);
        const savedData = await newUser.save();

        res.status(201).json(savedData); 
    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists." });
        }
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are Required" });
    }
    let isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "Already user exists with this Email.",
      });
    }
    await User.create({
      name,
      email,
      password,
    });
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Creating User",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ success: true, message: "Users Fetched Successfully", users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Fetching Users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User Fetched Successfully", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error to Fetch User",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error to Update User",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error to Delete User",
      error: error.message,
    });
  }
};

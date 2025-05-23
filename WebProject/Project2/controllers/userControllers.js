const { User} = require("../models");

const addUser = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const userData = req.body;
    let newUser;
    if (!Array.isArray(userData)) {
      console.log("line 9 >??::: ");
      newUser = await User.create(userData);
    } else{
      newUser = await User.bulkCreate(userData);
    }
    
    res.status(201).json({ message: "User Created Successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.update(req.body, { where: { id: userId } });
    if (result[0] === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    // const users = await User.findAll({ include: Blog });
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userDetail = await User.findByPk(userId);
    if (!userDetail) return res.status(404).json({ message: "User not found" });
    res.status(201).json(userDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.destroy({ where: { id: userId } });
    if (result[0] === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(201).json({ message: "User deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser, updateUser, getUser, getSingleUser, deleteUser };

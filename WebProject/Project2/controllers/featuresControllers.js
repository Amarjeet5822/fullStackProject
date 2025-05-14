const User = require("../models/User");
const { Op } = require("sequelize");


const userSearch = async (req, res) => {
  try {
    const { name, email } = req.query;
    // console.log("req.query, name, email", name, email);
    const whereClause = {};
    if (name) {
      whereClause.name = {
        [Op.like]: `%${name}%`
      };
    };
    if (email) {
      whereClause.email = {
        [Op.like]: `%${email}%`
      };
    };
    const result = await User.findAll({ where: whereClause });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userFilter = async (req, res ) => {
  try {
    const { city } = req.query;
    console.log("city: ", city)
    const whereClause = {};
    if(city) {
      whereClause.city = {
        [Op.eq]: city
      }
    };
    const result = await User.findAll({where:whereClause });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
module.exports = { userSearch, userFilter }
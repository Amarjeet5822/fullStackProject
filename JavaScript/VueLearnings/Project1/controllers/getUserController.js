const db = require("../config/dbConfig");

const getUser = async (req, res) => {
  const user = await db.promise().query(
    `SELECT * from Users`
  );
  console.log(user);
  res.status(200).json({message: "Success",users: user});
};

const addUser = async (req, res) => {
  // res.send("update user");
  const { name, age, city } = req.body;
  if (name && age && city) {
    try {
      await db.promise().query(
        `INSERT INTO USERS VALUES('${name}','${age}', '${city}' )`
      );
      res.status(201).json({ message: "user created" });
    } catch (error) {
      console.log(error);
    }
  }
};

const updateUser = async (req, res ) => {
   
}

const deleteUser = async (req, res ) => {

}

module.exports = { getUser, addUser, updateUser, deleteUser };

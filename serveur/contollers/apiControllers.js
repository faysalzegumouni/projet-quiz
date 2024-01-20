// apiControllers.js
const User = require("../models/User");
const Quiz = require("../models/Quiz");

const apiControllers = {
  register: async (req, res) => {
    const { email, displayname, password } = req.body;

    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { displayname }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email or username already exists" });
      }

      const newUser = new User({ email, displayname, password });

      const savedUser = await newUser.save();

      res.json(savedUser);
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    const { idUser, password } = req.body;

    try {
      const user = await User.findOne({
        $or: [{ email: idUser }, { displayname: idUser }],
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.password === password) {
        res.json({ message: "Login successful", user });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ... (autres méthodes)

};

module.exports = apiControllers;

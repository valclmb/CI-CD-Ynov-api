const Users = require("../model/user");

const getAllUsers = async (_, res) => {
  try {
    const users = await Users.find({});

    if (users.length === 0) {
      return res.status(404).json({ users: [], success: true });
    }
    return res.status(200).json({ users, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users: " + error.message,
      success: false,
    });
  }
};

/**
 * Create a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with status and message.
 */
const postUsers = async (req, res) => {
  const { firstName, lastName, email, birthDate, city, zipCode } = req.body;

  if (!firstName || !lastName || !email || !birthDate || !city || !zipCode) {
    return res.status(400).json({
      message: "Please provide all required fields",
      success: false,
    });
  }

  try {
    const user = new Users({
      firstName,
      lastName,
      email,
      birthDate,
      city,
      zipCode,
    });
    await user.save();

    return res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { getAllUsers, postUsers };

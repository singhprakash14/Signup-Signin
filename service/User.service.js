
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;


//signupUser

async function signupUser(username, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role });
  }


//getAlluser

  async function getAllUsers(adminId) {
    const admin = await User.findById(adminId);
  
    if (!admin || admin.role !== 'admin') {
      throw new Error('Access denied');
    }
  
    try {
      const users = await User.find({}, { password: 0 });
      return users;
    } catch (error) {
      throw new Error('An error occurred while fetching users');
    }
  }
  
//login
async function loginUser(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
    expiresIn: '1h',
  });

  

    return {token };
}

//delete

async function deleteUser(id) {
  try {
    if (!id) {
      throw new Error('Missing userId');
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error('User not found');
    }

    return deletedUser; 

  } catch (error) {
    console.error(error);
    throw error; 
  }
}




module.exports = { signupUser, loginUser,getAllUsers, deleteUser };

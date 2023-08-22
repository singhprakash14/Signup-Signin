const authService = require("../service/User.service");

async function signup(req, res) {
  try {
    const { username, password, role } = req.body;
    await authService.signupUser(username, password, role);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);
    
    res.cookie("token", token?.token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour in milliseconds
    });
    res.json({ message: "Logged In successfully" });
  } catch (error) {
    console.error(error.stack); 
    res.status(401).json({ error: "Invalid credentials" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await authService.getAllUsers(req.user.userId);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await authService.deleteUser(id);

    return res.status(200).send({ message: `user Deleted => ${id}` });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
}

module.exports = { signup, login, getAllUsers, deleteUser };

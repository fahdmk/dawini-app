const jwt = require("jsonwebtoken");
require('dotenv').config();
const signIn = async (req, res) => {
const user = req.body;
try {
const foundUser = await User.findOne({ email: user.email });
if (foundUser) {
if (user.password === foundUser.password) {
const token = jwt.sign(
{ id: foundUser._id, role: foundUser.role },
process.env.JWT_SECRET
);
res.status(200).json({ user: foundUser, token: token });
} else {
res.status(400).json({ msg: "Wrong password" });
}
} else {
return res.status(400).json({ msg: "User not registered" });
}
} catch (error) {
console.error(error);
res.status(500).json({ msg: "Server error" });
}
};

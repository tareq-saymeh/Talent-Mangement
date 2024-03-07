const bcrypt = require('bcrypt');
const User=require('../models/User');
// Route for resetting password
exports.tokenValidation=async (req,res)=>{
  const { token, password } = req.body;

  try {
    // Find the user with the matching reset password token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // If no user was found, the token is invalid or has expired
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Password reset successful
    res.status(200).json({ message: 'Password reset successful' });
    }
   catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error'})
    }
}

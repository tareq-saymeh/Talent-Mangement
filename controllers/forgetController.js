const TelegramBot = require('node-telegram-bot-api');
const User = require('../models/User');

const bot = new TelegramBot('BOT_TOKEN', { polling: false }); // Replace BOT_TOKEN with your actual bot token

exports.passwordRest = async (req, res) => {
  const token = crypto.randomBytes(20).toString('hex');
  const { email } = req.body;

  try {
    // Find the user with the matching email address
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No user with that email address' });
    }

    // Generate a reset password token and store it in the user's document in the database
    await User.updateOne({ email }, { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }});
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send the password reset message to the user's Telegram account
    const message = `You have requested to reset your password. Click http://localhost:4000/reset/${token} to reset your password.`;
    await bot.sendMessage(user.telegramChatId, message);

    // Return a success message to the user
    res.status(200).json({ message: 'Password reset message sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
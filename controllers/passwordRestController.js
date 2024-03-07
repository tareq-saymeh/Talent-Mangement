const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User=require('../models/User');

module.exports.passwordRest=async(req,res)=>{
  const { email } = req.body;
  try {
    // Find the user with the matching email address
    const user = await User.findOne({ email });
    
    if (!user) {
       return res.send(`<html>
      <body>
        <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header text-center">
                  <h1>Failed!</h1>
                </div>
                <div class="card-body">
                  <p>No User with that Email.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`);
    }
    
    // Generate a reset password token and store it in the user's document in the database
    const token = crypto.randomBytes(20).toString('hex');
    await User.updateOne({ email }, { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }});
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send the password reset email with a link to the password reset page
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'charles.wisozk@ethereal.email',
        pass: 'Tj5qKmUYqsDdSfyqUH'
    }
  });
    const message = {
      from: 'talent',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You have requested to reset your password. Click <a href="${process.env.PORT}${token}">here</a> to reset your password.</p>`,
    };
    await transporter.sendMail(message);

    // Return a success message to the user
    res.send(`<html>
     <body>
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header text-center">
                <h1>Success!</h1>
              </div>
              <div class="card-body">
                <p>Your request was processed successfully.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/js/bootstrap.min.js" integrity="sha512-qzB9Xs1QJYLbJEgshw6OMa2DkYU6mYU6pxcaz6TnU9ikj4CW0pD4oOEGGWoyAw0x/Sb1dQ70ZS/qvP57oPeW8g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </body>
  </html>`);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

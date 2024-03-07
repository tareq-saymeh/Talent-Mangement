const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const {sessionUserInfo}=require("../middleware/loginMiddleware")
/**
 * Diplays The users from the same comapny
 * @param {*} req 
 * @param {*} res Diplays the users page 
 */
const viewUsers = (req, res) => {
  const sessionInfo=sessionUserInfo()
  const currentUserCompany = sessionInfo.companyId.toString();
  User.find({ companyId: currentUserCompany }, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render("users/users", { title: "users", items: users });
    }
  });
  
};

/**
 * Add User DataBase
 * @param {*}req
 * @param {*}res
 */
const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, telegram } = req.body;
    const user = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      telegram: telegram ? telegram : undefined,
    });
    await user.save();
    res.redirect("/users");
  } catch (err) {
    console.error("Failed to add user", err);
    res.status(500).json({ error: "Failed to add user" });
  }
};

/**
 * Delete the User DataBase
 * @param {*} req
 * @param {*} res
 */
const deleteusers = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((params) => {
      console.log("User deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Update the User DataBase
 * @param {*}req
 * @param {*}res
 */
const editUser = async (req, res) => {
  try {
    const {
      editUserId,
      newUserEmail,
      userLastName,
      userFirstName,
      passwordTable,
      editTelegram,
    } = req.body;
    if (newUserEmail.includes("'")) {
      return res.status(400).send("Invalid Email syntax");
    } else {
      const countOldEmail = await User.countDocuments({
        _id: ObjectId(editUserId),
      });
      if (countOldEmail == 0) {
        return res.status(400).send("No Such User in the DataBase");
      } else {
        countNewEmail = await User.countDocuments({ email: newUserEmail });
        if (countNewEmail == 1 && newUserEmail != userEmail) {
          return res.status(400).send("New Email Alrady Exists");
        } else {
          const UpdateUser = await User.findOneAndUpdate(
            { _id: ObjectId(editUserId) },
            {
              $set: {
                email: newUserEmail ? newUserEmail : undefined,
                firstName: userFirstName,
                lastName: userLastName,
                password: passwordTable,
                telegram: editTelegram ? editTelegram : undefined,
              },
            },
            { new: true }
          );
          res.redirect("/users");
          return res.status(200);
        }
      }
    }
  } catch (err) {
    console.log("Error");
  }
};

module.exports = { viewUsers, editUser, addUser, deleteusers };

const User = require('../models/User');
const studentsTable = require('../models/Students');
const positionTable = require('../models/Position');
const skillsTable = require('../models/Skill');
const Company = require('../models/Company');
/**
 *
 * @param {*} req
 * @param {*} res
 */
const viewDashboard = async (req, res) => {
  try {
    const userID= req.session.user_id;//all id
    const companyUser= await User.findOne({_id:userID}).populate('companyId');
    const companyID=companyUser.companyId._id.toString();
    var skillsArray=[];
    var users=[];
    User.find({ companyId: companyID }, (err, users) => {
      if (err) {
        res.status(500).send("Database Error");
      }
      if (users && users.length > 0) {
        const userIds = users.map(user => user._id);
        skillsTable.find({ userId: { $in: userIds } }, (err, skills) => {
          if (err) {
            return res.status(500).send("Database Error");
          }
          if (skills && skills.length > 0) {
            skillsArray = skills;
          }
        });
      } else {
        return res.status(204).send("Null Data");
      }
    });
    const userCount = await User.countDocuments();
    const studentsCount = await studentsTable.countDocuments();
    const acceptedStudentsCount = await positionTable.countDocuments({ status: '1' });
    const awaitedStudentsCount = await positionTable.countDocuments({ status: '0' });
    const info = [
      {
        icon: 'fa-regular fa-building',
        cardTitle: 'Users',
        counter: userCount
      },
      {
        icon: 'fa-users',
        cardTitle: 'Students',
        counter: studentsCount
      },
      {
        icon: 'fa-user-check',
        cardTitle: 'Opened',
        counter: acceptedStudentsCount
      },
      {
        icon: 'fa-solid fa-user-lock',
        cardTitle: 'Closed',
        counter: awaitedStudentsCount
      }
    ];
    const skillsAggregation = [
      {
        $match: {
          _id: { $in: skillsArray.map(skill => skill._id) }
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'skills',
          as: 'students'
        },
      },
      {
        $project: {
          name: 1,
          studentCount: { $size: '$students' }
        }
      }
    ];
    const skillsInTable = await skillsTable.aggregate(skillsAggregation);
    const skillsObject = skillsInTable.map(skill => skill.name);
    const skillNumbers = skillsInTable.map(skill => skill.studentCount);
    const stdAggregation = [
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ];
    const std = await studentsTable.aggregate(stdAggregation);
    const countsChart = std.map(obj => obj.count);
    const chartLevels = std.map(obj => obj._id);
    res.render('dashboard/dashboard', {
      users: users,
      info: info,
      title: 'Dashboard Page',
      chartData: countsChart,
      chartLevels: chartLevels,
      skillNumbers: skillNumbers,
      skillsObject: skillsObject
    });
  } catch (err) {
    console.error(err);
    res.render('error');
  }
};
module.exports = {
  viewDashboard
};
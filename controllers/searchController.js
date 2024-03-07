const Position = require('../models/Position');
const Skill = require('../models/Skill');

/**
 * Search function that takes the search's input value and search on it in the database
 * @param {*} req takes the value in its body
 * @param {*} res result array of documentations
 */
exports.searchPosition = function (req, res) {
        const { search } = req.query;
        if (search == "search") {
                Position.find({})
                        .populate('requiredSkills')
                        .exec((err, positions) => {
                                if (err) {
                                        console.log(err);
                                } else {
                                        Skill.find({}, (err, skillList) => {
                                                if (err) {
                                                        console.log(err);
                                                } else {
                                                        res.render('position/position', {
                                                                title: "Positions",
                                                                items: positions,
                                                                skills: skillList
                                                        });
                                                }
                                        });
                                }
                        });
        } else {
                Position.find({ title: { $regex: ".*" + search + ".*" , $options: 'i'} })
                        .populate('requiredSkills')
                        .exec((err, positions) => {
                                if (err) {
                                        console.log(err);
                                } else {
                                        Skill.find({}, (err, skillList) => {
                                                if (err) {
                                                        console.log(err);
                                                } else {
                                                        res.render('position/position', {
                                                                title: "Positions",
                                                                items: positions,
                                                                skills: skillList
                                                        });
                                                }
                                        });
                                }
                        });
        }
}

/**
 * Search function that takes the search's input value and search on it in the database
 * @param {*} req takes the value in its body
 * @param {*} res result array of documentations
 */
exports.searchSkill = function (req, res) {
        const { search } = req.query;
        if (search == "search") {
                Skill.find({}, (err, skillList) => {
                        if (err) {
                                console.log(err);
                        } else {
                                res.render('skills/skills', {
                                        title: "skills",
                                        items: skillList
                                });
                        }
                });
        } else {
                Skill.find({
                        description: { $regex: ".*" + search + ".*" , $options: 'i'} 
                }, (err, skillList) => {
                        if (err) {
                                console.log(err);
                        } else {
                                res.render('skills/skills', {
                                        title: "skills",
                                        items: skillList
                                });
                        }
                });
        }
}
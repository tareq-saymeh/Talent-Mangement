const Student = require('../models/Students')
const Skill = require('../models/Skill')
const Position = require('../models/Position')
/**
 * return Students page
 * @param {*}req
 * @param {*}res
 */
const viewStudents = async(req, res) => {
  try {
    const students = await Student.find({})
      .populate('skills');
    const positions = await Position.find({})
      .populate('requiredSkills');
    const skills = await Skill.find({});
    for (let i = 0; i < students.length; i++) {
      const pos = await Position.find({ requiredSkills:{ $all : students[i].skills.sort()} });
      const title = pos.map(x => x.title);
      students[i].postitle = title;
    }
    Student.find({})
    .populate('skills')
    .exec((err, student) => {
        if (err) {
            return res.status(500).send("Database Error")
        }
        Skill.find({}, (err, skill) => {
            if (err) {
                return res.status(500).send("Database Error")
            }
            Position.find({},(err,Posi)=>{
                if(err){
                    return res.status(500).send("Database Error")
                }
                    
                    res.render('talentFilters/studentsTable', { title: 'students', items: students, skills: skills, position: positions  });
            })
        })
    })
  } catch (err) {
    console.log(err);
    res.status(500).send("Database Error");
  }
  }

async function viewFilterPage(req, res){
    const {skills1,logic,skills2}=req.query;
    if (skills1 == undefined && skills2 == undefined) {
      try {
        const students = await Student.find({})
          .populate('skills');
        const positions = await Position.find({})
          .populate('requiredSkills');
        const skills = await Skill.find({});
        for (let i = 0; i < students.length; i++) {
          const pos = await Position.find({ requiredSkills:{ $all : students[i].skills.sort()} });
          const title = pos.map(x => x.title);
          students[i].postitle = title;
        }
        Student.find({})
        .populate('skills')
        .exec((err, student) => {
            if (err) {
                return res.status(500).send("Database Error")
            }
            Skill.find({}, (err, skill) => {
                if (err) {
                    return res.status(500).send("Database Error")
                }
                Position.find({},(err,Posi)=>{
                    if(err){
                        return res.status(500).send("Database Error")
                    }

                        res.render('talentFilters/studentsTable', { title: 'students', items: students, skills: skills, position: positions  });
                })
            })
        })
      } catch (err) {
        console.log(err);
        res.status(500).send("Database Error");
      }
    } 
      
    else {
      if (logic == "or") {
        const allStud = [skills1, skills2];
        try {
          const students = await Student.find({ skills: { $in: allStud } })
            .populate('skills');
          const positions = await Position.find({})
            .populate('requiredSkills');
          const skills = await Skill.find({});
          for (let i = 0; i < students.length; i++) {
            const pos = await Position.find({ requiredSkills:{ $all : students[i].skills.sort()} });
            const title = pos.map(x => x.title);
            students[i].postitle = title;
          }
          Student.find({})
          .populate('skills')
          .exec((err, student) => {
              if (err) {
                  return res.status(500).send("Database Error")
              }
              Skill.find({}, (err, skill) => {
                  if (err) {
                      return res.status(500).send("Database Error")
                  }
                  Position.find({},(err,Posi)=>{
                      if(err){
                          return res.status(500).send("Database Error")
                      }
                          let stuSize=Student.length;
                          const saveObject=[]
                          let AvSkill=[]
                          for(let stu=0;stu<student.length;stu++){
                              let arr2=[]
                              for(let pos=0;pos<Posi.length;pos++)
                              {
                                  var skillSize=0;
                                  var skillAvailable=0;
                                  for(var posRS=0;posRS<Posi[pos].requiredSkills.length;posRS++){
                                      skillSize++;
                                      for(var studentSkill=0;studentSkill<student[stu].skills.length;studentSkill++)
                                      {
                                          var posSk=Posi[pos].requiredSkills[posRS].toString()
                                          var stuSkill=student[stu].skills[studentSkill]._id
                                          if(posSk==stuSkill){
                                              skillAvailable++;
                                          }
                                      }
                                  }
                                  var percent=(skillAvailable/skillSize)
                                  if(percent>=0.5&&percent<1.0)
                                  {
                                      arr2.push(Posi[pos].title)
                                  }
                              }
                              AvSkill.push(arr2)
                          }
                          res.render('talentFilters/studentsTable', { title: 'students', items: students, skills: skills, position: positions ,object: AvSkill });
                  })
              })
          })
        } catch (err) {
          console.log(err);
          res.status(500).send("Database Error");
        }
      } else if (logic == "and") {
        var allStud;
        if (typeof (skills1) == "object" && typeof (skills2) == "object") {
          allStud = [...skills1, ...skills2];
        } else if (typeof (skills1) == "object" && !(typeof (skills2) == "object")) {
          const length = skills1.length;
          skills1[length] = skills2;
          allStud = skills1;
        } else if (!(typeof (skills1) == "object") && (typeof (skills2) == "object")) {
          const length = skills2.length;
          skills2[length] = skills1;
          allStud = skills2;
        } else {
          allStud = [skills1, skills2];
        }

        //
        //const pos = await Position.find({ requiredSkills:{ $all : students[i].skills.sort()} });
        try {
          const students = await Student.find({ skills: { $all: allStud } })
            .populate('skills');
          const positions = await Position.find({})
            .populate('requiredSkills');
          const skills = await Skill.find({});
          for (let i = 0; i < students.length; i++) {
            const pos = await Position.find({ requiredSkills:{ $all : students[i].skills.sort()} });
            const title = pos.map(x => x.title);
            students[i].postitle = title;
          }
          Student.find({})
          .populate('skills')
          .exec((err, student) => {
              if (err) {
                  return res.status(500).send("Database Error")
              }
              Skill.find({}, (err, skill) => {
                  if (err) {
                      return res.status(500).send("Database Error")
                  }
                  Position.find({},(err,Posi)=>{
                      if(err){
                          return res.status(500).send("Database Error")
                      }
                          let stuSize=Student.length;
                          const saveObject=[]
                          let AvSkill=[]
                          for(let stu=0;stu<student.length;stu++){
                              let arr2=[]
                              for(let pos=0;pos<Posi.length;pos++)
                              {
                                  var skillSize=0;
                                  var skillAvailable=0;
                                  for(var posRS=0;posRS<Posi[pos].requiredSkills.length;posRS++){
                                      skillSize++;
                                      for(var studentSkill=0;studentSkill<student[stu].skills.length;studentSkill++)
                                      {
                                          var posSk=Posi[pos].requiredSkills[posRS].toString()
                                          var stuSkill=student[stu].skills[studentSkill]._id
                                          if(posSk==stuSkill){
                                              skillAvailable++;
                                          }
                                      }
                                  }
                                  var percent=(skillAvailable/skillSize)
                                  if(percent>=0.5&&percent<1.0)
                                  {
                                      arr2.push(Posi[pos].title)
                                  }
                              }
                              AvSkill.push(arr2)
                          }
                          res.render('talentFilters/studentsTable', { title: 'students', items: students, skills: skills, position: positions ,object: AvSkill });
                  })
              })
          })
        } catch (err) {
          console.log(err);
          res.status(500).send("Database Error");
        }
        }
    }
}

module.exports = { viewFilterPage, viewStudents }
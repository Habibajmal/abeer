const express = require("express");
let router = express.Router();
var Degrees=require("../../models/degree")


//get all users
router.get("/", async (req, res) => {
  let degree=await Degrees.find();
    return res.send(degree); 
});
router.get("/uniid", async (req, res) => {
  let degree=await Degrees.find({uniname:req.body.uniname});
    return res.send(degree); 
});

router.get("/department", async (req, res) => {
  let degree=await Degrees.find({department:req.body.department});
  if(degree)  
  return res.send(degree); 
  else
  return res.send("Degree not found in the department")
});
router.post("/enter",async function(req, res) {
  let degree=await Degrees.findOne ({$and:
     [{degreeid:req.body.degreeid},{uniname:req.body.uniname}
    ]})
  if (degree){
    return res.status("400").send("Degree exist already in the same university");

  }

  let degrees= new Degrees()
  degrees.degreeid=req.body.degreeid,
  degrees.degreename=req.body.degreename,
  degrees.uniname=req.body.uniname,
  degrees.rank=req.body.rank,
  degrees.department=req.body.department,
  await degrees.save()
  return  res.send(degrees)
  
});





router.put("/update", async (req, res) => {
  let degree = await Degrees.findOne({$and:[{ uniname: req.body.uniname },{degreeid:req.body.degreeid}]});
  if (!degree) {
    return res.status("400").send(" Degree did not exist");
  }

  if (req.body.degreeid && req.body.degrename && req.body.uniname &&req.body.department) {
    return res.status("400").send("Fill the password");
  }
  degree.degreeid=req.body.degreeid,
  degree.degreename=req.body.degreename,
  degree.uniname=req.body.uniname,
  degree.rank=req.body.rank,
  degree.department=req.body.department,
  await degree.save();
  return  res.send(degree)
  
});

router.delete("/delete", async (req, res) => {
 
  
  let degree=await Degrees.findOne ({$and:
    [{degreeid:req.body.degreeid},{uniname:req.body.uniname}
   ]});
  if(degree)
  {
   degree.delete();
    res.send("degree delete");
  } 
  else
    res.send("degree not found");

});

module.exports = router;
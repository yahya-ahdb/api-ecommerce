const Users= require("../models/authModel")
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

exports.AuthRegister =async(req, res)=>{
    try {
        const FoundUser = await Users.findOne({email : req.body.email })
        if(FoundUser){
           return res.status(200).send({ success : false , message : "The email isn't availability" })
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
            const newUsers = new Users({...req.body, password :hash })
            await newUsers.save()
          res.status(201).send({ success: true , message : "Welcome" })
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.AuthLogin = async (req,res)=>{
    try {
        const userFound= await Users.findOne({ email :req.body.email })
        if(!userFound)
        return res.status(200).send({ success :false , message : "The email n't found" })

        const IsMatch = await bcrypt.compare(req.body.password, userFound.password);
        if (!IsMatch)
          return res
            .status(200)
            .send({ message: "The email or password invlid", success: false });

            const token = jwt.sign({ id: userFound._id , isAdmin : userFound.isAdmin }, process.env.SEC_JWT, {
                expiresIn: "1d",
              });
              res.status(200).json({ user: userFound, token, success: true });
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.authController = async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.body._id });
      if (!user) {
        return res
          .status(200)
          .send({ messgae: "user not found", seccuss: false });
      } else {
        res.status(200).json({
          seccuss: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address : user.address,
            phone : user.phone,
          },
        });
      }
    } catch (error) {
      res.status(401).send({ seccuss: false, message: "Auth error", error });
    }
  };


exports.GetAllUser = async(req,res)=>{
  try {
    const AllUser =await Users.find()
    res.status(200).send({success : true , data :AllUser})
  } catch (error) {
    res.status(500).send(error)
  }
}
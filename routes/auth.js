const express = require("express")
const { AuthRegister, AuthLogin, authController, GetAllUser } = require("../controllers/authCont")
const { verifyUser } = require("../utils/VerifyToken")
const { verifyAdmin } = require("../utils/AdminToken")

const router = express.Router()

router.post("/register" , AuthRegister)

router.post("/login" , AuthLogin )

router.post("/getuserDate", verifyUser , authController)

router.get("/getAlluser", verifyAdmin , GetAllUser)

module.exports = router
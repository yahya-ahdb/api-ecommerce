const express = require("express")
const { verifyUser } = require("../utils/VerifyToken")
const { CreateOrder, GetAllOrder , DeleteOrder } = require("../controllers/orderCont")
const { verifyAdmin } = require("../utils/AdminToken")

const router = express.Router()

router.post("/create" , verifyUser , CreateOrder)

router.get("/" , verifyAdmin , GetAllOrder)

router.delete("/delete/:id" , verifyAdmin , DeleteOrder)


module.exports = router
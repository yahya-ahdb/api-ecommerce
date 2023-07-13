const express =require('express')
const { verifyAdmin } = require('../utils/AdminToken')
const { CreateProduct, GetProduct, GetSingleProduct, DeleteProduct, UpdateProduct } = require('../controllers/productCont')

const router = express.Router()

router.post("/create" , verifyAdmin  , CreateProduct )

router.get("/"  , GetProduct )

router.get("/:id"  , GetSingleProduct )

router.delete("/delete/:id" , verifyAdmin  , DeleteProduct )

router.put("/update/:id" , verifyAdmin  , UpdateProduct )

module.exports = router
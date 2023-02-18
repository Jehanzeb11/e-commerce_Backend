const express = require("express")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verify")

const Cart = require("../models/Cart")

const router = express.Router()



// create new product


router.post("/", verifyToken, async (req, res) => {
const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})



// updated

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }

})

// // delete User

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Cart has been deleted" })
    } catch (error) {
        res.status(500).json(error)
    }

})


// // get user cart

router.get("/find/:userId", verifyTokenAndAuthorization ,async (req, res) => {
    try {
        const cart = await Cart.findOne({userId:req.params.userId})

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }

})


// // get all carts

router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try {
const carts = await Cart.find()
res.status(200).json(carts)

    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router
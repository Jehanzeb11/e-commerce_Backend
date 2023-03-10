const express = require("express")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verify")

const Order = require("../models/Order")

const router = express.Router()



// create Order


router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})



// updated order

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }

})

// // delete order

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Order has been deleted" })
    } catch (error) {
        res.status(500).json(error)
    }

})


// // get user order

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }

})


// // get all user orders

router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try {
        const orders = await Order.find()
        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json(error)
    }

})




// get admin income

router.get("/income", verifyTokenAndAdmin, async (req, res) => {

 

  try {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  // const timeNew = new Date(previousMonth)
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: lastMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }

})



module.exports = router
const { User } = require('../models/database');

async function ItemPost(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const rentalData = {
      RentedItems: req.body.id,
      RentalDuration: req.body.RentalDuration,
      TotalPayment: req.body.amount
    };

    // Update user's RentalHistory
    user.RentalHistory.push(rentalData);
    await user.save();

    // Update the item's RentalStatus in ItemsListed
    const updatedItem = await User.findOneAndUpdate(
      { "ItemsListed._id": req.body.id },
      { $set: { "ItemsListed.$.RentalStatus": true } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = ItemPost;
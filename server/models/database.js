const mongoose = require('mongoose');

// Rental Schema
const RentalSchema = new mongoose.Schema({
    RentedItems: {          // id of listed Items
        type: String,
        required: true
    },
    DateOfRent:{
        type : Date ,
        default : Date.now()
    },
    RentalDuration: {
        type: Number,
        min: 1,
        required: true
    },
    TotalPayment: {
        type: Number,
        required: true
    }
})

const ListedItems = new mongoose.Schema({
    OwnerName: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemCategory: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    maxRentalDuration: {
        type: Number,
        required: true
    },
    RentalStatus:{
        type: Boolean,
        default: false //available for renting by default
    }
})


// user Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    RentalHistory: {
        type: [RentalSchema]
    },
    ItemsListed: {
        type: [ListedItems]
    }
});


const User = new mongoose.model('User', UserSchema);

// exporting User collection
module.exports = {
    User
}
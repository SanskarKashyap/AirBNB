const mongoose = require("mongoose");
const Placechema = mongoose.Schema({
  title: String,
  address: String,
  photo: [String],
  discription: String,
  perks: [String],
  extraInfo: String,

  chekin: Number,
  checkout: Number,
  maxGuests: Number,
  
  ownner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const PlaceModel = mongoose.model("Place", Placechema);

module.exports = PlaceModel;

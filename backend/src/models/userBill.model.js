import mongoose from "mongoose";

const userBillSchema = new mongoose.Schema(
  {
    // USER (tenant)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ELECTRICITY
    ele_units: {
      type: Number,
      min: 0,
      required: true,
    },

    ele_rate: {
      type: Number,
      min: 0,
      required: true,
    },

    // Electricity CHARGE
    ele_amount: {
      type: Number,
      min: 0,
      required: true,
    },

    // WATER CHARGE
    water_amount: {
      type: Number,
      min: 0,
      required: true,
    },

    // ROOM RENT
    room_amount: {
      type: Number,
      required: true,
      min: 0,
      required: true,
    },

    total_amount: {
      type: Number,
      min: 0,
      required: true,
    },

    paid: {
      type: Boolean,
      default: false,
    },
    // BILL MONTH/YEAR
    month: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },

    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

userBillSchema.index({ user: 1 });

userBillSchema.index({ month: 1, year: 1 });

userBillSchema.index({ user: 1, month: 1, year: 1 });

export default mongoose.model("UserBill", userBillSchema);

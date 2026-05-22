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
    },

    final_amount: {
      type: Number,
      min: 0,
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
        "baisakh",
        "jestha",
        "ashadh",
        "shrawan",
        "bhadra",
        "ashwin",
        "kartik",
        "mangsir",
        "poush",
        "magh",
        "falgun",
        "chaitra",
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

userBillSchema.index({ user: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("UserBill", userBillSchema);

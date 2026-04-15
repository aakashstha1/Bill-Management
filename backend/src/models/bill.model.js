import mongoose, { Schema } from "mongoose";

const billSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    units: {
      type: Number,
      min: 0,
      required: true,
    },
    total_amount: {
      type: Number,
      min: 0,
      required: true,
    },
    paid_amount: {
      type: Number,
      min: 0,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
    },
    final_amount: {
      type: Number,
      min: 0,
      required: true,
    },
    service_charge: {
      type: Number,
      min: 0,
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
    paid_date: {
      type: Date,
      required: true,
    },
    bill_type: {
      type: String,
      enum: ["electricity", "water"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

billSchema.index({ bill_type: 1 });

billSchema.index({ month: 1, year: 1 });

billSchema.index({ bill_type: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Bill", billSchema);

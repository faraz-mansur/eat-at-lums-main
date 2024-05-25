const express = require("express");
const router = express.Router();
const Complaints = require("../models/Complaints");
const User = require("../models/User");
const jwtAuth = require("../middlewares/jwtAuth");

const { body, validationResult } = require("express-validator");

router.post("/reportrider", jwtAuth, async (req, result) => {
  const student_id = req.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return result.status(400).json({ errors: errors.array() });
  }

  try {
    const highestComplaintID = await Complaints.findOne()
      .sort({ complaintID: -1 })
      .limit(1);
    const newComplaintID = highestComplaintID
      ? highestComplaintID.complaintID + 1
      : 1;
    await Complaints.create({
      complaintID: newComplaintID,
      studentID: student_id,
      orderID: req.body.orderID,
      riderID: req.body.riderID,
    });
    const complaintsCount = await Complaints.countDocuments({
      riderID: req.body.riderID,
    });
    if (complaintsCount >= 3) {
      await User.updateOne({ id: req.body.riderID }, { banned: 1 });
    }
    result.json({ success: true });
  } catch (error) {
    result.json({ success: false });
  }
});

module.exports = router;

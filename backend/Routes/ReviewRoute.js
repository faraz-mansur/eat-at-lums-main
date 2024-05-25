const express = require("express");
const router = express.Router();
const Reviews = require("../models/Reviews");
const jwtAuth = require("../middlewares/jwtAuth");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// to get all reviews
router.get("/getreviews", async (req, res) => {
  const eatery_id = req.query.eatery_id;
  try {
    const reviews = await Reviews.find({ eatery_id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// to search review
router.get("/search", async (req, res) => {
  const eatery_id = req.query.eatery_id;
  const query = req.query.q;
  try {
    const results = await Reviews.find({
      eatery_id: eatery_id,
      review: { $regex: query, $options: "i" },
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// to write a review
router.post(
  "/writereview",
  jwtAuth,
  body("review", "must be minimum 1 character").isLength({ min: 2 }),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ id: req?.id });
      await Reviews.create({
        id: req.id,
        name: user.name,
        date: req.body.date,
        rating: req.body.rating,
        review: req.body.review,
        eatery_id: req.body.eatery_id,
      });
      result.json({ success: true });
    } catch (error) {
      result.json({ success: false });
    }
  }
);

module.exports = router;

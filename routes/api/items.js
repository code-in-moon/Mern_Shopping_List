const express = require("express");
const router = express.Router();
// Item model
const Item = require("../../models/Item");
const auth = require("../../middleware/auth");

// @route  GET api/items
// @desc   get all items
// @access  public      without authentication anyone can see
router.get("/", (req, res) => {
  //we find all document in "item" collection
  Item.find((err, items) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({
        succes: { success: true },
        items: items,
      });
    }
  }).sort({ date: -1 });
});

// @route  POST api/items
// @desc   create a post
// @access  private      without authentication anyone can see here auth in that
router.post("/", auth, (req, res) => {
  newItem = req.body;
  //here we add a document to "item" collection
  Item.create(newItem, (err, item) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ succes: { success: true }, items: item });
    }
  });
});

// @route  DELETE api/items
// @desc   delete a post
// @access  private     without authentication anyone can see here auth in that

router.delete("/:_id", auth, (req, res) => {
  itemId = req.params._id;
  //here we delete a document in "item" collection  base on its id
  Item.findByIdAndRemove(itemId, (err, brother, item) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

module.exports = router;

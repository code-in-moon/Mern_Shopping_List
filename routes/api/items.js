const express = require("express");
const router = express.Router();
// Item model
const Item = require("../../models/Item");
// app = express();

// @route  GET api/items
// @desc   get all items
// @access  public      without authentication anyone can see
router.get("/", (req, res) => {
  //we find all document in "item" collection
  Item.find((err, items) => {
    if (err) {
      // throw err;   // throw error couse crash in request and server dont use it here
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({
        succes: { success: true },
        items: items,
      });
      //res.status(200).json({success: true})
    }
  }).sort({ date: -1 });
});

// @route  GET api/items
// @desc   get a specific items
// @access  public      without authentication anyone can see
router.get("/:_id", (req, res) => {
  itemId = req.params._id;
  //we find a specific document in "item" collection
  Item.findById(itemId, (err, item) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({
        succes: { success: true },
        items: item,
      });
      //res.status(200).json({success: true})
    }
  });
});

// @route  POST api/items
// @desc   create a post
// @access  public      without authentication anyone can see
router.post("/", (req, res) => {
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

// @route  PUT api/items
// @desc   update a post
// @access  public      without authentication anyone can see
router.put("/:_id", (req, res) => {
  itemId = req.params._id;
  updateItem = req.body;
  //here we update a document in "item" collection  base on its id
  Item.findByIdAndUpdate(itemId, updateItem, (err, item) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      //res.json(item);
      res.status(200).json({ success: true });
    }
  });
});

// @route  DELETE api/items
// @desc   delete a post
// @access  public      without authentication anyone can see

router.delete("/:_id", (req, res) => {
  itemId = req.params._id;
  //here we delete a document in "item" collection  base on its id
  Item.findByIdAndRemove(itemId, (err, brother, item) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      //res.json(item);
      res.status(200).json({ success: true });
    }
  });
});

module.exports = router;

import express from "express";

const gamesRouter = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the games page!");
});

export default router;

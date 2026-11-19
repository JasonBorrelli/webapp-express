import express from "express";

const router = express.Router();

router.get("/", (req, res) => {                         // definizione di una route per la INDEX della sezione giochi dell'API
  res.send("Welcome to the games page!");
});








export default router;

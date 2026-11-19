import express from "express";

const router = express.Router();

router.get("/", (req, res) => {                         // definizione di una route per la INDEX della sezione giochi dell'API
  res.send("Welcome to the games page!");
});

router.get("/:id", (req, res) => {                     // definizione di una route per la SHOW della sezione giochi dell'API
  const id = req.params.id;
    res.send(`Welcome to the game page with ID: ${id}`);
});

router.post("/", (req, res) => {                        // definizione di una route per la CREATE della sezione giochi dell'API
  res.send("Game created successfully!");
});

router.patch("/:id", (req, res) => {                      // definizione di una route per la UPDATE della sezione giochi dell'API
  const id = req.params.id;
  res.send(`Game with ID: ${id} updated successfully!`);
});

router.delete("/:id", (req, res) => {                     // definizione di una route per la DESTROY della sezione giochi dell'API
  const id = req.params.id;
  res.send(`Game with ID: ${id} deleted successfully!`);
});

export default router
 
export default function validateId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid id: must be a positive integer" });
  }

  req.id = id;
  next();
}

export default function validateBody(schema) {
  return function (req, res, next) {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      const error = result.error.issues
        .map((issue) => {
          const path = issue.path.join(".");
          return path ? `${path}: ${issue.message}` : issue.message;
        })
        .join("; ");

      return res.status(400).json({ error });
    }

    req.body = result.data;
    next();
  };
}

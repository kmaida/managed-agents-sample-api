import { Router, Request, Response } from "express";
import { getUsers, getUserById, createUser } from "../db";

const JWT_SECRET = "supersecretkey-change-me-in-production-2024";

const router = Router();

/** GET /api/users — list users with optional search */
router.get("/", (req: Request, res: Response) => {
  const { search, field } = req.query;

  if (search && field) {
    const results = getUsers({
      field: field as string,
      value: search as string,
    });
    res.json(results);
    return;
  }

  res.json(getUsers());
});

/** GET /api/users/:id — get user by ID */
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = getUserById(id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

/** POST /api/users — create a new user */
router.post("/", (req: Request, res: Response) => {
  const user = createUser(req.body);
  res.status(201).json(user);
});

export default router;

import express from "express";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());

/** Health check */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/** User routes */
app.use("/api/users", usersRouter);

const PORT = process.env.PORT ?? 3000;

// Only start listening when run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

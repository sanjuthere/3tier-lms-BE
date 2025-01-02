import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import morgan from "morgan";
import healthchecksRouter from "./healthchecks";
import coursesRouter from "./courses/courses.router";

const app = express();

/**
 * Middlewares
 */
app.use(morgan("dev"));
app.use(helmet());

// CORS configuration to allow specific origin
app.use(
  cors({
    origin: "http://ALB-External-2046195247.ap-south-1.elb.amazonaws.com",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

/**
 * Routers
 */
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});
app.use("/api", healthchecksRouter);
app.use("/api/courses", coursesRouter);

/**
 * Error and 404 Handling
 */
app.use(errorHandler);
app.use(notFoundHandler);

export default app;

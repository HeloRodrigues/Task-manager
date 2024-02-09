import express from "express";
import { getTask, createTask, deleteTask, updateTask } from "./database.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-origin",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  getTask()
    .then((res) => {
      res.status(200).send(res);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/tasks", (req, res) => {
  createTask(req.body)
    .then((res) => {
      res.status(200).send(res);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/tasks/:task_name", (req, res) => {
  deleteTask(req.params.task_name)
    .then((res) => {
      res.status(200).send(res);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/tasks/:task_status", (req, res) => {
  const status = req.params.task_status;
  const body = req.body;
  updateTask(status, body)
    .then((res) => {
      res.status(200).send(res);
    })
    .catch(res.status(500).send(error));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

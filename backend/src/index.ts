import * as express from "express";
import { getTask, createTask, deleteTask, updateTask } from "./database";

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
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      express.response.status(500).send(error);
    });
});

app.post("/tasks", (req, res) => {
  createTask(req.body)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      express.response.status(500).send(error);
    });
});

app.delete("/tasks/:id", (req, res) => {
  deleteTask(req.params.id)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      express.response.status(500).send(error);
    });
});

app.put("/tasks/:id", (req, res) => {
  const status = req.params.id;
  const body = req.body;
  updateTask(status, body)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      express.response.status(500).send(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

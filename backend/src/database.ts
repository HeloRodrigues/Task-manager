//CRUD -> create, read, update, delete
import * as pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

type Config = {
  user: string | undefined;
  host: string | undefined;
  port: any;
  password: string | undefined;
  database: string | undefined;
};

const userName = process.env.USER_NAME;
const hostName = process.env.HOST;
const port = process.env.PORT;
const password = process.env.PASSWORD;
const dbName = process.env.DATABASE;

const config: Config = {
  user: userName,
  host: hostName,
  port: port,
  password: password,
  database: dbName,
};

const pool = new Pool(config);

export const getTask = async () => {
  try {
    return await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM tasks", (error, res) => {
        if (error) {
          reject(error);
        }
        if (res && res.rows) {
          resolve(res.rows);
        } else {
          reject(new Error("No elements found."));
        }
      });
    });
  } catch (error) {
    console.log("🚀 ~ getData ~ error:", error);
    throw new Error("Internal server error");
  }
};

export const createTask = (body: {
  task_name: any;
  task_status: any;
  start_date: any;
  deadline: any;
}) => {
  return new Promise((resolve, reject) => {
    const { task_name, task_status, start_date, deadline } = body;
    pool.query(
      "INSERT INTO tasks (task_name, task_status, start_date, deadline) VALUES ($1, $2, $3, $4) RETURNING *",
      [task_name, task_status, start_date, deadline],
      (error, res) => {
        if (error) {
          reject(error);
        }
        if (res && res.rows) {
          resolve(`Anew task was added: ${JSON.stringify(res.rows[0])}`);
        } else {
          reject(new Error("Unable to add task"));
        }
      }
    );
  });
};

export const deleteTask = (id: string) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM tasks WHERE name = $1", [id], (error, res) => {
      if (error) {
        reject(error);
      }
      if (res && res.rows) {
        resolve(`Task deleted`);
      } else {
        reject(new Error("Unable to delete task"));
      }
    });
  });
};

export const updateTask = (
  id: string,
  body: {
    task_name: string;
    start_date: any;
    deadline: any;
    task_status: string;
  }
) => {
  return new Promise((resolve, reject) => {
    const { task_name, start_date, deadline, task_status } = body;
    pool.query(
      "UPDATE tasks SET task_name = $1, task_status = $2, start_date = $3, deadline = $4",
      [task_name, task_status, start_date, deadline, id],
      (error, res) => {
        if (error) {
          reject(error);
        }
        if (res && res.rows) {
          resolve(`Task updated: ${JSON.stringify(res.rows[0])}`);
        } else {
          reject(new Error("Unable to update task"));
        }
      }
    );
  });
};

pool.connect((error, client) => {
  if (error) throw error;
});

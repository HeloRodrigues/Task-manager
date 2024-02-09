//CRUD -> create, read, update, delete

import pkg from "pg";

const { Pool } = pkg;

const config = {
  user: "postgres",
  host: "localhost",
  port: 5432,
  password: "har100892",
  database: "task-manager",
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

export const createTask = (body) => {
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

export const deleteTask = (task_name) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM tasks WHERE name = $1",
      [task_name],
      (error, res) => {
        if (error) {
          reject(error);
        }
        if (res && res.rows) {
          resolve(`Task with the name ${task_name} deleted`);
        } else {
          reject(new Error("Unable to delete task"));
        }
      }
    );
  });
};

export const updateTask = (task_status, body) => {
  return new Promise((resolve, reject) => {
    const { task_name, start_date, deadline } = body;
    pool.query(
      "UPDATE tasks SET task_name = $1, task_status = $2, start_date = $3, deadline = $4",
      [task_name, task_status, start_date, deadline],
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

// pool.connect((error, client) => {
//   if (error) throw error;

//   const taskName = "Build to-do app with NodeJs + Postgresql";
//   const nameToDelete = "Build task-manager app";

//   client.query(
//     `INSERT INTO tasks (task_name, task_status, start_date, deadline) VALUES ('${taskName}', 'in progress', '2024-01-10', '2024-12-10') returning *`,
//     (error, res) => {
//       if (error) {
//         console.log("data not inserted.", error);
//       } else {
//         console.log("data inserted successfully.");
//         console.log(res.rows);
//       }
//       pool.end;
//     }
//   );

//   client.query(
//     `DELETE FROM tasks WHERE task_name = '${nameToDelete}' RETURNING *`
//   ),
//     (error, res) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Row deleted!");
//         console.log(res.rows);
//       }
//       pool.end;
//     };
// });

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

pool.connect((error, client) => {
  if (error) throw error;

  const taskName = "Build to-do app with NodeJs + Postgresql";
  const nameToDelete = "Build task-manager app";

  client.query(
    `INSERT INTO tasks (task_name, task_status, start_date, deadline) VALUES ('${taskName}', 'in progress', '2024-01-10', '2024-12-10') returning *`,
    (error, res) => {
      if (error) {
        console.log("data not inserted.", error);
      } else {
        console.log("data inserted successfully.");
        console.log(res.rows);
      }
      pool.end;
    }
  );

  client.query(
    `DELETE FROM tasks WHERE task_name = '${nameToDelete}' RETURNING *`
  ),
    (error, res) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Row deleted!");
        console.log(res.rows);
      }
      pool.end;
    };
});

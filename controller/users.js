import connection from "../db/index.js";

export const getUsers = async (req, res, next) => {
  try {
    connection.connect();

    connection.query("SELECT * FROM Users", (err, rows, fielld) => {
      if (err) throw err;

      console.log("Users are: ", rows);
      res.status(200).json({ users: rows });
    });
    connection.end();
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

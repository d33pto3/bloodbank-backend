export const getUsers = (pool) => async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute("SELECT * FROM Users");
    connection.release();

    console.log("Users are: ", rows);
    res.status(200).json({ users: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const createUsers = async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

import bcrypt from "bcryptjs";

export const signup = (pool) => async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const { name, email, blood_type, password, district, thana } = req.body;
    const donor = false;

    if (!(email && password && name && blood_type)) {
      return res.status(400).send("All input is required");
    }

    const [existingUser] = await connection.execute(
      `SELECT id FROM Users WHERE email=?`,
      [email]
    );

    if (existingUser[0]) {
      console.log(existingUser[0]);
      return res.status(409).send("User already exists. Please Login.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await connection.execute(
      `INSERT INTO Users 
      (name, email, blood_type, password, district, thana, donor) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, blood_type, encryptedPassword, district, thana, false]
    );

    if (user) {
      console.log(user);
      return res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

console.log();
export const signup = (pool) => async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const { name, email, blood_type, password, district, thana } = req.body;

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

    if (user[0].insertId) {
      const insertedUserId = user[0].insertId;

      const payload = {
        userId: insertedUserId,
        email: email,
        // blood_type: blood_type,
      };

      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: "7d",
      });

      if (token) {
        const responseData = {
          user: {
            id: insertedUserId,
            name,
            email,
            blood_type,
            district,
            thana,
            donor: false,
          },
          token: token,
        };

        return res.status(200).send(responseData);
      }
      return res.status(500).send("User registration failed!");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("User registration failed!");
  }
};

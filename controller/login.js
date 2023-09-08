import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const jwtSecret = process.env.TOKEN_KEY;

export const login = (pool) => async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const { email, password } = req.body;
    console.log(email, password);

    if (!email && !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    console.log(email, password);

    const [user] = await connection.execute(
      "SELECT id, email, password, blood_type FROM Users WHERE email = ?",
      [email]
    );
    console.log(user);

    if (!user[0]) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const payload = {
      userId: user[0].id,
      email: user[0].email,
    };

    const bloodToken = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

    res.status(200).json({
      user: {
        id: user[0].id,
        email: user[0].email,
        blood_type: user[0].blood_type,
      },
      bloodToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occured while logging in" });
  }
};

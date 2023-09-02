import mysql2 from "mysql2/promise";

const createPool = (host, user, password, database) => {
  return mysql2.createPool({
    host,
    user,
    password,
    database,
  });
};

export default createPool;

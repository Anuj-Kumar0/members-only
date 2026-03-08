const pool = require("../db/pool");

async function createUser(firstName, lastName, email, password, isAdmin) {
    await pool.query(
      `INSERT INTO users (first_name,last_name,email,password,is_admin)
       VALUES ($1,$2,$3,$4,$5)`,
      [firstName, lastName, email, password, isAdmin]
    );
  }

async function findUserByEmail(email) {
    const { rows } = await pool.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER($1)`,
        [email]
      );
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function becomeMember(userId) {
  await pool.query(
    `UPDATE users SET membership_status = true WHERE id = $1`,
    [userId]
  );
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  becomeMember,
};
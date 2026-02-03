require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const person = {
  async findUnique({ where: { name } }) {
    const { rows } = await pool.query(
      'SELECT name, "xMin", "xMax", "yMin", "yMax" FROM "Person" WHERE name = $1 LIMIT 1',
      [name],
    );
    return rows[0] || null;
  },

  async createMany({ data = [], skipDuplicates = false }) {
    if (!data.length) return { count: 0 };

    const values = [];
    const placeholders = data.map((row, idx) => {
      const offset = idx * 5;
      values.push(row.name, row.xMin, row.xMax, row.yMin, row.yMax);
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`;
    });

    const conflict = skipDuplicates ? "ON CONFLICT (name) DO NOTHING" : "";
    const sql =
      `INSERT INTO "Person" (name, "xMin", "xMax", "yMin", "yMax") VALUES ${placeholders.join(
        ", ",
      )} ${conflict}`.trim();

    const result = await pool.query(sql, values);
    return { count: result.rowCount };
  },
};

const prisma = {
  person,
  async $disconnect() {
    await pool.end();
  },
};

module.exports = { prisma, pool };

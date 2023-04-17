import { Handler } from "express";
import { client } from "../db";

export const getAllBurger: Handler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 9;
  const offset = (page - 1) * pageSize;

  const text = "SELECT * FROM burger ORDER BY id DESC OFFSET $1 LIMIT $2";

  const results: Burger[] = [];
  const values = [offset, pageSize];

  try {
    const { rows } = await client.query(text, values);

    for (let i = 0; i < rows.length; i++) {
      results.push(rows[i]);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ error: "Unable to load list." });
  }

  return res.json({ data: results });
};

export const getAllBurgerPageCount: Handler = async (req, res) => {
  const text = "SELECT COUNT(*) FROM burger";

  let result = 0;

  try {
    const { rows } = await client.query(text);

    result = rows[0].count;
  } catch (err) {
    console.log(err);
    return res.json({ error: "Unable to load burger counts." });
  }

  return res.json({ data: { counts: result } });
};

export const getBurger: Handler = async (req, res, next) => {
  const id = req.params.id;

  const text = "SELECT * FROM burger WHERE id = $1";

  const value = [id];

  const result: Burger[] = [];

  try {
    const { rows } = await client.query(text, value);

    result.push(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ error: "Unable to load burger." });
  }

  return res.json({ data: result });
};

export const getMyBurgers: Handler = async (req, res, next) => {
  const userId = req.params.userId;
  const { page } = req.query;

  const pageNum = parseInt(page as string) || 1;

  const pageSize = 9;
  const offset = pageNum * pageSize;

  const text =
    "SELECT * FROM burger ORDER BY id DESC OFFSET $1 LIMIT $2 WHERE userId = $3";

  let results: Burger[] = [];
  const value = [offset, pageSize, userId];

  try {
    const { rows } = await client.query(text, value);

    for (let i = 0; i < rows.length; i++) {
      results.push(rows[i]);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ error: "Unable to Get burgers with user id." });
  }

  return res.json({ data: results });
};

export const createBurger: Handler = async (req, res) => {
  const body = req.body;

  const text =
    "INSERT INTO burger (name, brand, description, userId) VALUES ($1, $2, $3, $4)";
  const values = [body.name, body.brand, body.description, body.userId];

  try {
    await client.query(text, values);
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ error: "Unable to Create burger." });
  }

  return res.json(body);
};

export const updateBurger: Handler = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const text =
    "UPDATE burger SET name=$1, brand=$2, description=$3 WHERE id = $4";
  const values = [body.name, body.brand, body.description, id];

  try {
    await client.query(text, values);
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ error: "Unable to Update burger." });
  }

  return res.json(body);
};

export const deleteBurger: Handler = async (req, res) => {
  const id = req.params.id;

  const text = "DELETE FROM burger WHERE id = $1";
  const values = [...id];

  try {
    await client.query(text, values);
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.json({ error: "Unable to Delete burger." });
  }

  return res.json({ message: "Deleted Burger." });
};

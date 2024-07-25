import { Request, Response } from "express";
import { pool } from "../server";

/**
 * Retrieves all users from the database.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} The response object with the users data.
 */
export const getAllUsers = async (
  _: Request,
  res: Response
): Promise<Response> => {
  const sql = "SELECT * FROM users";
  try {
    const [rows] = await pool.query(sql);
    return res.status(200).json({ users: rows, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users: " + (error as Error).message,
      success: false,
    });
  }
};

/**
 * Create a new user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} The response object with status and message.
 */
export const postUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, email, birthDate, city, zipCode } = req.body;
  const sql =
    "INSERT INTO users (firstName, lastName, email, birthDate, city, zipCode) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    await pool.query(sql, [
      firstName,
      lastName,
      email,
      birthDate,
      city,
      zipCode,
    ]);
    return res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user: " + (error as Error).message,
      success: false,
    });
  }
};

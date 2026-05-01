import db from '../config/dbcon.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body; 
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if(rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, rows[0].password);
    if(!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        {
            id: rows[0].id,
            email: rows[0].email,
            role: rows[0].role
        },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
    );  
    return res.status(200).json({ token, role: rows[0].role, name: rows[0].name, message: 'Login successful' });
}

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body; 

  if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    const [existingUser] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )

    if(existingUser.length > 0){
        return res.status(409).json({ message: 'Email already in use' });
    }

    if(password !== confirmPassword){
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
    );

    if(!result.insertId){
        return res.status(500).json({ message: 'Error creating user'});
    }

    return res.status(201).json({ message: 'User created successfully' });
}

export const getDashboardData = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE role = ?', ["superadmin"]
        )
        return res.status(200).json({ data: rows });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching dashboard data", error });
    }
}

export const getUsersData = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * 10;
    try {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE role != ? ORDER BY name ASC LIMIT 10 OFFSET ?", ["superadmin", offset]
        )
        const [countRows] = await db.execute(
            "SELECT COUNT(*) as count FROM users"
        )
        const totalCount = countRows[0].count;
        return res.status(200).json({ data: rows, count: totalCount });
    } catch (err) {
        return res.status(500).json({message: "Error fetching users data" + err});
    }
}

export const addUser = async (req, res) => {
    try{
        const { name, email, password, confirmPassword, role } = req.body; 

        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
            }
            const [existingUser] = await db.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            )

            if(existingUser.length > 0){
                return res.status(409).json({ message: 'Email already in use' });
            }

            if(password !== confirmPassword){
                return res.status(400).json({ message: 'Passwords do not match' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await db.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, hashedPassword, role]
            );

            if(!result.insertId){
                return res.status(500).json({ message: 'Error creating user'});
            }

            return res.status(201).json({ message: 'User created successfully' });
    } catch (err){
        return res.status(500).json({message: 'User add failed || ' + err.message})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.query.id;

    try{
        await db.execute(
            "DELETE FROM users WHERE id = ?", [id]
        )
        return res.status(200).json({message: "User account delete successfully"})
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Delete Failed!"})
    }
}

export const updateUser = async (req, res) => {
  try {
    const { email, name, role, password } = req.body;
    const { id } = req.query;

    if (!email || !name || !role) {
      return res.status(400).json({
        message: "Email, name, and role are required",
      });
    }

    const [emailExists] = await db.execute(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, id]
    );

    if (emailExists.length > 0) {
      return res.status(422).json({
        message: "Email already used. Try another.",
      });
    }

    let query = "UPDATE users SET email = ?, name = ?, role = ?";
    const params = [email, name, role];

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password = ?";
      params.push(hashedPassword);
    }

    query += " WHERE id = ?";
    params.push(id);

    await db.execute(query, params);

    return res.status(200).json({
      message: "User account updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update user account",
    });
  }
};


export const searchUser = async (req, res) => {
    const search = req.query.search;
    const searchTerm = `%${search}%`;
    try{
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email like ? OR name like ? OR role like ?", [searchTerm, searchTerm, searchTerm]
        )
        return res.status(200).json({data: rows})
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went wrong in filter, try again"})
    }
}
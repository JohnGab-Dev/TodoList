import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../config/dbcon.js';

export async function getTodos(req, res) {
  try {
    const userId = req.user.id;

    const [rows] = await db.execute(
      "SELECT * FROM todos WHERE userId = ?",
      [userId]
    );

    const [[totalTask]] = await db.execute(
      "SELECT COUNT(*) as total FROM todos WHERE userId = ?",
      [userId]
    );

    const [[pendingTask]] = await db.execute(
      "SELECT COUNT(*) as pending FROM todos WHERE userId = ? AND status = ?",
      [userId, "Pending"]
    );

    const [[completedTask]] = await db.execute(
      "SELECT COUNT(*) as completed FROM todos WHERE userId = ? AND status = ?",
      [userId, "Completed"]
    );

    return res.status(200).json({
      data: rows,
      total_tasks: totalTask.total,
      total_pending: pendingTask.pending,
      total_completed: completedTask.completed,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
export async function addTodo(req, res) {
    try {
        const userId = req.user.id;

        const { task, status, priority, dueDate } = req.body;

        const [result] = await db.execute(
        "INSERT INTO todos (userId, task, status, priority, due_date) VALUES (?, ?, ?, ?, ?)",
        [userId, task, status, priority, dueDate]
        );

        return res.status(200).json({
            message: "Todo created successfully",
            todoId: result.insertId,
        });

    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
}

export async function editTodo(req, res) {
    try {
        const taskId = req.query.id;

        const { task, status, priority, dueDate } = req.body;

        const [result] = await db.execute(
        "UPDATE todos SET task = ?, status = ?, priority = ?, due_date = ? WHERE id = ?",
        [task, status, priority, dueDate, taskId]
        );

        if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Todo not found",
        });
        }

        return res.status(200).json({
        message: "Todo updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
}


export async function deleteTodo(req, res){
    try {
        const taskId = req.query.id;

        const [result] = await db.execute('DELETE FROM todos WHERE id = ?',
            [taskId]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }
        return res.status(200).json({
         message: "Todo deleted successfully",
        });
       
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function signup(req, res){
    const { name, email, password, confirmPassword } = req.body; 

    const [existingUser] = await db.execute(
        'SELECT * FROM user WHERE email = ?',
        [email]
    )

    if(existingUser.length > 0){
        return res.status(500).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
        'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );

    if(!result.insertId){
        return res.status(500).json({ message: 'Error creating user'});
    }

    return res.status(200).json({ message: 'User created successfully' });
}

export async function login(req, res){
    const { email, password } = req.body; 
    const [rows] = await db.execute(
      'SELECT * FROM user WHERE email = ?',
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
            name: rows[0].name,
            email: rows[0].email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    ); 
    
    const user = {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,   
    };

    return res.status(200).json({ token, user, message: 'Login successful' });
}
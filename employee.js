const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.user,
  host: "localhost",
  database: "postgres-api",
  password: process.env.password,
  port: 5433,
});

const createUserId = (req, res) => {
  const {
    id,
    email,
    password,
    confirm_password,
    mode_of_contact,
    phone,
    skills,
  } = req.body;

  pool.query(
    "INSERT INTO userdetails (email,password,confirm_password,mode_of_contact,phone,skills) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ",
    [email, password, confirm_password, mode_of_contact, phone, skills],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json({
        msg: "data created successfully",
        hello:"hellodharmik",
        data: result.rows[0],
      });
    }
  );
};

const getAllUser = (req, res) => {
  pool.query("SELECT * FROM userdetails", (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows,
    });
  });
};

const getUserById = (req, res) => {
  let id = parseInt(req.params.id);

  pool.query("SELECT * FROM userdetails WHERE id=$1", [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows[0],
    
    });
  }); 
};

const updateUserById = (req, res) => {
  let id = parseInt(req.params.id);
  const { email, password, confirm_password, mode_of_contact, phone, skills } =
    req.body;
  console.log("id :>> ", id);
  // (email,password,confirm_password,mode_of_contact,phone,skills) VALUES ($1,$2,$3,$4,$5,$6)

  pool.query(
    "UPDATE userdetails SET email =$1 ,password = $2, confirm_password = $3, mode_of_contact = $4 ,phone = $5, skills=$6 WHERE id=$7 RETURNING *",
    [email, password, confirm_password, mode_of_contact, phone, skills, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json({
        data: result.rows[0],
      });
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM userdetails WHERE id=$1", [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      msg: `userdetails with ${id} Deleted successfuly`,
    });
  });
};

module.exports = {
  createUserId,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUser,
};

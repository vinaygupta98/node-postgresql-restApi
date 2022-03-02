const { pool } = require("../config/db");

// with using pool

const getAllHorrors = async (request, response) => {
  try {
    const query = request.query;
    let order = query?.order_by
      ? query.order_by == 1
        ? "ASC"
        : "DESC"
      : "DESC";
    const data = await pool.query(
      `SELECT * FROM horrors ORDER BY rating ${order}`
    );
    if (data.rows.length > 0) {
      response.status(200).json({
        success: true,
        message: "Fetched Successfully",
        results: data.rows,
      });
    } else {
      response.status(200).json({
        success: false,
        message: "No result found",
        results: [],
      });
    }
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

const getHorrorById = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const data = await pool.query("SELECT * FROM horrors WHERE id = $1 ", [id]);
    if (data.rows.length > 0) {
      response.status(200).json({
        success: true,
        message: "Fetched Successfully",
        result: data.rows[0],
      });
    } else {
      response.status(200).json({
        success: false,
        message: "No result found",
        result: [],
      });
    }
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

const addHorror = async (request, response) => {
  try {
    if (request.body.rating || request.body.name) {
      const { name, rating } = request.body;

      pool.query(
        "INSERT INTO horrors (name, rating) VALUES ($1, $2)",
        [name, rating],
        (error, results) => {
          console.log(error, results);
          response.status(201).send({
            success: true,
            message: "Horror added successfully.",
            result: results.rows,
          });
        }
      );
    } else {
      response.status(200).send({
        success: false,
        message: "name and rating does not provided but they are required",
      });
    }
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

const updateHorror = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const { name, rating } = request.body;

    pool.query(
      "UPDATE horrors SET name = $1, rating = $2 WHERE id = $3",
      [name, rating, id],
      (error, results) => {
        response.status(200).send({
          success: true,
          message: `Horror with id ${id} modified.`,
          result: results.rows,
        });
      }
    );
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

const deleteHorror = (request, response) => {
  try {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM horrors WHERE id = $1", [id], (error, results) => {
      response.status(200).send({
        success: true,
        message: `Horror with id ${id} deleted.`,
        result: results.rows,
      });
    });
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllHorrors,
  getHorrorById,
  addHorror,
  updateHorror,
  deleteHorror,
};

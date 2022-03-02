const { sequelize } = require("../config/db");

// with using sequelize ODM

const getAllHorrors = async (request, response) => {
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM horrors ORDER BY rating DESC"
    );
    if (results) {
      response.status(200).json({
        success: true,
        message: "Fetched Successfully",
        results: results,
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
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM horrors WHERE id = ${id}`
    );
    if (results) {
      response.status(200).json({
        success: true,
        message: "Fetched Successfully",
        result: results[0],
      });
    } else {
      response.status(200).json({
        success: false,
        message: "No result found",
        result: null,
      });
    }

    // pool.query(
    //   "SELECT * FROM horrors WHERE id = $1",
    //   [id],
    //   (error, results) => {
    //     response.status(200).json({
    //       success: true,
    //       message: "Fetched Successfully",
    //       result: results.rows,
    //     });
    //   }
    // );
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

const addHorror = async (request, response) => {
  try {
    if (request.body.rating || request.body.name) {
      const { name, rating } = request.body;
      const [results, metadata, oid, rows, fields] = await sequelize.query(
        `INSERT INTO horrors (name, rating) VALUES ('${name}', '${rating}')`
      );
      if (results) {
        response.status(200).json({
          success: true,
          message: "Added Successfully",
          result: results,
        });
      } else {
        response.status(200).json({
          success: false,
          message: "Something went Wrong",
          result: null,
        });
      }
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

const updateHorror = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const { name, rating } = request.body;
    if (id && name && rating) {
      const [results, metadata] = await sequelize.query(
        `UPDATE horrors SET name = '${name}', rating = '${rating}' WHERE id = ${id}`
      );
      if (results) {
        response.status(200).json({
          success: true,
          message: `Horror with id ${id} modified.`,
          result: results,
        });
      } else {
        response.status(200).json({
          success: false,
          message: "Something went Wrong.",
          result: null,
        });
      }
    }
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

const deleteHorror = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (id) {
      const [results, metadata] = await sequelize.query(
        `DELETE FROM horrors WHERE id = ${id}`
      );
      if (results) {
        response.status(200).json({
          success: true,
          message: `Horror with id ${id} deleted.`,
          result: results,
        });
      } else {
        response.status(200).json({
          success: false,
          message: "No id was Provided for delete.",
          result: null,
        });
      }
    }
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

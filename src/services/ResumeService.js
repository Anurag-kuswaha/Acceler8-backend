const db = require("../sequelize/models");
const { v4: uuidv4, validate } = require("uuid");
const { Op } = require("sequelize");
const ResumeUtils = require("../Utils/ResumeUtils");
const getResumeDetailsById = async (id) => {
  try {
    console.log("id is", id);
    if (!validate(id)) {
      return {
        statusCode: 400,
        response: { msg: `User Id must be an UUID`, error: true },
      };
    }
    const dbData = await db.resumes.findByPk(id);
    console.log("dbData is", dbData);
    if (!dbData) {
      return {
        statusCode: 400,
        response: { msg: `No Resume found with this Id ${id} `, error: true },
      };
    }
    return {
      statusCode: 200,
      response: { data: dbData, error: false },
    };
  } catch (e) {
    console.log("eror occured", e);
    return {
      statusCode: 500,
      response: { error: true, msg: "Internal Server Error" },
    };
  }
};

const createResumeService = async (body) => {
  try {
    console.log("body is ", body);
    console.log(body);
    const { error } = ResumeUtils.ValidateResumeSchema({ ...body });

    if (error) {
      return {
        response: { msg: error.details[0].message, error: true },
        statusCode: 400,
      };
    }
    console.log("db", db);
    const resumeId = uuidv4();
    const dbData = await db.resumes.create({ ...body, id: resumeId });
    return {
      statusCode: 200,
      response: { data: dbData, error: false },
    };
  } catch (e) {
    console.log("eror occured", e);
    return {
      statusCode: 500,
      response: { error: true, msg: "Internal Server Error" },
    };
  }
};

const getResumeListByName = async (name) => {
  try {
    console.log("name is ", name);
    if (!name)
      return {
        statusCode: 400,
        response: { error: true, msg: "Name is required" },
      };

    name = name.replace("+", " ");
    const [firstName, lastName] = name.split(" ");
    if (!firstName || !lastName)
      return {
        statusCode: 400,
        response: {
          error: true,
          msg: "Both first and last names are required",
        },
      };
    // first do exact match and if none found then do first and last name search
    let dbData = await db.resumes.findAll({
      where: {
        name: {
          [Op.iLike]: `${firstName.toLowerCase()} ${lastName.toLowerCase()}`,
        },
      },
      raw: true,
    });
    let totalCount = await db.resumes.count({
      where: {
        name: {
          [Op.iLike]: `${firstName.toLowerCase()} ${lastName.toLowerCase()}`,
        },
      },
    });
    //console.log('1st dbData', dbData);
    if (dbData && dbData.length === 0) {
      dbData = await db.resumes.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `${firstName}%` } },
            { name: { [Op.iLike]: `%${lastName}` } },
          ],
        },
        raw: true,
      });
      totalCount = await db.resumes.count({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `${firstName}%` } },
            { name: { [Op.iLike]: `%${lastName}` } },
          ],
        },
      });
      // console.log('2nd dbData', dbData);
    }

    //console.log('dbData is', dbData);
    if (!dbData) {
      return {
        statusCode: 400,
        response: { msg: `No Record found for the ${name}`, error: true },
      };
    }
    return {
      statusCode: 200,
      response: {
        data: dbData,
        totalCount,
        currentCount: dbData.length,
        error: false,
      },
    };
  } catch (e) {
    console.log("eror occured", e);
    return {
      statusCode: 500,
      response: { error: true, msg: "Internal Server Error" },
    };
  }
};

module.exports = {
  createResumeService,
  getResumeDetailsById,
  getResumeListByName,
};

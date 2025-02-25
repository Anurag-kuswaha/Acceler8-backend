
const {createResumeService, getResumeDetailsById, getResumeListByName} = require('../services/ResumeService')
exports.uploadResumeDetails = async (req, res) => {
  const { statusCode, response } = await createResumeService(req.body);
  return res.status(statusCode).send(response);

};

exports.getResumeById = async (req, res) => {  
    const { statusCode, response } = await getResumeDetailsById(req.params.id);
    return res.status(statusCode).send(response);
  
};

exports.getResumeByName = async (req, res) => {
  const { statusCode, response } = await getResumeListByName(req.params.name);
    return res.status(statusCode).send(response);
};

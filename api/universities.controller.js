const fs = require('fs');
const UNIVERSITIES = require('../config/universities.json');
const Fuse = require('fuse.js');
const options = {
  keys: ['name'],
  threshold: 0.4
};
const fuse = new Fuse(UNIVERSITIES, options);

exports.getUniversities = (req, res, next) => {
  return res.status(200).json({
    data: UNIVERSITIES
  });
};

exports.getUniversity = (req, res, next) => {
  if (!req.query.hasOwnProperty('q')) {
    return res.status(400).json({
      message: "Invalid parameters."
    });
  }

  const universityName = decodeURIComponent(req.query.q).toLowerCase();
  const result = fuse.search(universityName);
  return res.status(200).json({
    result_count: result.length,
    result: result
  });
};

// exports.getUniversities = (req, res, next) => {

// };
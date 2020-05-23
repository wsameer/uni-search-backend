const UNIVERSITIES = require('../config/universities.json');
const Handlers = require('../utils/common-handlers.js');
const Fuse = require('fuse.js');

exports.getAllDomains = (req, res, next) => {
  let domains = new Map();

  for (var i = UNIVERSITIES.length - 1; i >= 0; i--) {
    const university = UNIVERSITIES[i];

    // Domain doesn't exist for this university
    if (!university.domain) {
      continue;
    }

    let endDomain = university.domain.split(/[.]+/).pop();
    if (domains.has(endDomain)) {
      continue;
    }

    domains.set(endDomain, endDomain);
  }

  return res.status(200).json({
    result_count: domains.size,
    data: [...domains.keys()]
  });
};

exports.getCountryCodes = (req, res, next) => {
  let countryCodes = new Map();

  for (var i = UNIVERSITIES.length - 1; i >= 0; i--) {
    const university = UNIVERSITIES[i];

    if (
      !university.alpha_two_code ||
      countryCodes.has(university.alpha_two_code)
    ) {
      continue;
    }

    countryCodes.set(university.alpha_two_code, university.alpha_two_code);
  }

  return res.status(200).json({
    result_count: countryCodes.size,
    data: [...countryCodes.keys()]
  });
};

exports.getUniversities = (req, res, next) => {

  let limit = 5;
  let start = 0;
  let universityName = '';
  let countryCode = '';
  let domain = '';
  let finalResult = [];
  let message = '';

  const options = {
    keys: [],
    threshold: 0.2
  };

  // mandatory parameters
  if (req.query.limit) {
    console.log(req.query.limit);
    limit = Number.isInteger(parseInt(req.query.limit, 10)) ? parseInt(req.query.limit, 10) : 5;
  }

  if (req.query.start) {
    start = Number.isInteger(parseInt(req.query.start, 10)) ? parseInt(req.query.start, 10) : 0;
  }

  console.log(req.query);

  // with parameters
  if (req.query.hasOwnProperty('q')) {
    universityName = decodeURIComponent(req.query.q).toLowerCase();
    options.keys = [...options.keys, 'name'];
    options.threshold = Handlers.setFuzzyThreshold(universityName.length);
  }

  if (universityName !== '') {
    // fuzzy  search
    console.log(options);
    const fuse = new Fuse(UNIVERSITIES, options);
    const result = fuse.search(universityName);
    for (var i = result.length - 1; i >= 0; i--) {
      let element = result[i].item;
      finalResult.push(element);
    }
  } else {
    // no fuzzy research
    finalResult = UNIVERSITIES;
  }

  console.log(`Total record count matching are ${finalResult.length}`);

  if (req.query.code != null) {
    console.log('countryCode is here');
    countryCode = decodeURIComponent(req.query.code).toLowerCase();
    console.log(`country code to search is ${countryCode}`);
    let filteredData = finalResult.filter((uni, index) => {
      if (uni.alpha_two_code) {
        return uni.alpha_two_code.toLowerCase() === countryCode;
      }
    });

    console.log(`Filtered data length is ${filteredData.length}`);
    finalResult = filteredData;
  }

  if (req.query.domain != null) {
    // console.log('countryCode is here');
    domain = decodeURIComponent(req.query.domain).toLowerCase();

    let filteredData = finalResult.filter((uni, index) => {
      if (uni.domain) {
        let endDomain = uni.domain.split(/[.]+/).pop();
        return endDomain.toLowerCase() === domain;
      }
    });

    console.log(`Filtered data length is ${filteredData.length}`);
    finalResult = filteredData;
  }

  // last check
  console.log(`Final record count is ${finalResult.length}`);

  // No data found
  if (finalResult.length < 1) {
    return res.status(200).json({
      total_count: 0,
      data: null,
      current_count: 0,
      message: 'No data found',
      limit: limit,
      next: start
    });
  }

  if (finalResult.length > start) {
    let totalCount = finalResult.length;
    finalResult = finalResult.slice(start, limit + start);

    return res.status(200).json({
      total_count: totalCount,
      current_count: finalResult.length,
      data: finalResult,
      limit: limit,
      next: start + limit
    });

  } else {
    return res.status(200).json({
      total_count: 0,
      current_count: 0,
      data: null,
      message: 'Pagination out of bounds',
      limit: limit,
      next: start + limit
    });
  }
};

exports.getUniversityOpenGraphData = (req, res, next) => {
  if (req.params.url) {

    const universityWebsite = decodeURIComponent(req.params.url).trim();

    Handlers.getOpenGraphData(universityWebsite)
      .then((data) => {
        return res.status(200).json({
          data: data
        });
      })
      .catch(err => {
        console.log('fsdsadasda');
        return res.status(400).json({
          error: err.error,
          message: err.message
        });
      })
  } else {
    return res.status(400).json({
      message: "Invalid parameters"
    });
  }
  
};
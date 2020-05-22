const Universities = require('./universities.controller');

const universitiesRoutes = (router) => {

  /**
   * GET
   * Check the health of the API
   */
  router.get('/universities/health', (req, res) => res.json({ ok: true }));

  /**
   * GET
   * All the universities
   */
  router.get('/universities/get', Universities.getUniversities);

  /**
   * GET
   * Search a university by name
   * @param {string} q The search query
   * @param {number} limit The total number of records the API should return
   * @param {number} skip The total number of record from the skipped to be skipped
   */
  router.get('/universities/search/', Universities.getUniversity);

};

module.exports = universitiesRoutes;
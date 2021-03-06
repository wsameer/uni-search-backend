const Universities = require('./universities.controller');

const universitiesRoutes = (router) => {

  /**
   * GET
   * Returns a list of all domains
   */    
  router.get('/universities/domains', Universities.getAllDomains);

  /**
   * GET
   * Returns a list of all the country codes
   */ 
  router.get('/universities/countrycodes', Universities.getCountryCodes);

  /**
   * GET
   * Check the health of the API
   */
  router.get('/universities/health', (req, res, next) => res.json({ ok: true }));

  /**
   * GET
   * Get Open graph meta data about the university
   */
  router.get('/universities/og/:url', Universities.getUniversityOpenGraphData);

  /**
   * GET
   * Search a university by name
   * @param {string} q The search query
   * @param {number} limit The total number of records the API should return
   * @param {number} start The total number of record from the start to be skipped
   */
  router.get('/universities/search', Universities.getUniversities);

};

module.exports = universitiesRoutes;
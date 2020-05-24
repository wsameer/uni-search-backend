const rp = require('request-promise');
const cheerio = require('cheerio');

const Handlers = (() => {
  function setFuzzyThreshold(strLength) {
    if (!strLength) {
      return 0.4;
    }

    if (strLength > 6) {
      return 0.3;
    }
    
    return 0.4;
  }

  function getOpenGraphData(url) {
    return rp(url)
      .then(function (html) {
        const $ = cheerio.load(html);

        let ogImage = $('meta[property="og:image"]').attr('content');
        if (!ogImage) {
          ogImage = '';
        }

        let ogTitle = $('meta[property="og:title"]').attr('content');
        if (!ogTitle) {
          ogTitle = $('head > title').text() ? $('head > title').text().trim() : '';
        }

        let ogDescription = $('meta[property="og:description"]').attr('content');
        if (!ogDescription) {
          ogDescription = $('meta[name="description"]').attr('content');
        }

        return {
          'ogTitle': ogTitle,
          'ogImage': ogImage,
          'ogDescription': ogDescription
        };
      })
      .catch(function (err) {
        console.log(err.error);
        throw err;
      });
  }

  return {
    setFuzzyThreshold: setFuzzyThreshold,
    getOpenGraphData: getOpenGraphData
  }

})();

module.exports = Handlers;
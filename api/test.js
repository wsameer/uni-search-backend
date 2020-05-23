const rp = require('request-promise');
const cheerio = require('cheerio');

rp('http://www.acu.edu/')
  .then(function (html) {
    //success!
    const $ = cheerio.load(html);

    let ogImage = $('meta[property="og:image"]').attr('content');
    if (!ogImage) {
      ogImage = 'https://picsum.photos/200/300';
    }

    let ogTitle = $('meta[property="og:title"]').attr('content');
    if (!ogTitle) {
      ogTitle = $('head > title').text().trim();
    }

    let ogDescription = $('meta[property="og:description"]').attr('content');
    if (!ogDescription) {
      ogDescription = $('meta[name="description"]').attr('content').trim();
    }

    console.log(ogImage);
    console.log(ogTitle);
    console.log(ogDescription);
  })
  .catch(function (err) {
    //handle error

  });

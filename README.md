**Get all domains**
----
  Returns json data containing all the unique university domains 

* **URL**

	  api/universities/domains

* **Method:**

  `GET`
  
*  **URL Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "result_count": 7, "data": ["org", "edu", "zm", "us", "net", "ca", "com"] }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : { message: "Internal server error" } }`

  OR

  * **Code:** 403 <br />
    **Content:** `{ error : "Invalid parameters" }`

* **Sample Call:**

  ```javascript
    axios.get('.../api/universities/domains')
      .then(response => console.log(response))
      .catch(error => console.error(error));
  ```


**Get all country codes**
----
  Returns json data containing all the unique country codes 

* **URL**

	  api/universities/countrycodes

* **Method:**

  `GET`
  
*  **URL Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "result_count": 4, "data": ["DZ","AL","AF","US"] }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : { message: "Internal server error" } }`

  OR

  * **Code:** 403 <br />
    **Content:** `{ error : "Invalid parameters" }`

* **Sample Call:**

  ```javascript
    axios.get('.../api/universities/countrycodes')
      .then(response => console.log(response))
      .catch(error => console.error(error));
  ```

**Search Universities**
----
  Returns json data containing the university names matching the search keywords. The result is based on a fuzzy search done on the total records found with a threshold of 0.2/0.3 and 0.4 depending on the length of the search keyword. 

* **URL**

	  api/universities/search

* **Method:**

  `GET`
  
*  **URL Params**
 
	   `q=[string]      // The search query`
	   `limit=[integer] // The total number of records the API should return`
	   `start=[integer]  // The total number of record from the start to be skipped`

	If the `q` parameter is skipped, then the API will return all the data starting from first record in the database till the `limit`. By default, the `limit`  is 10, and `start` is 0.

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
  "total_count": 26,
  "current_count": 5,
  "data": [
    {
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "hsc.unt.edu",
      "name": "University of North Texas Health Science Center",
      "web_page": "http://www.hsc.unt.edu/"
    },
    {
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "swmed.edu",
      "name": "University of Texas Southwestern Medical Center at Dallas",
      "web_page": "http://www.swmed.edu/"
    },
	{...}
  ],
  "limit": 5,
  "next": 5
}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : { message: "Internal server error" } }`

  OR

  * **Code:** 200  <br />
    **Content:** `{ total_count: 0,
      current_count: 0,
      data: null,
      message: 'Pagination out of bounds',
      limit: 10,
      next: 0 }`

OR

* **Sample Call:**

  ```javascript
    axios.get('.../api/universities/search?q=texas&limit=5&start=0')
      .then(response => console.log(response))
      .catch(error => console.error(error));
  ```

**Get University's Details**
----
  Returns json data containing the university's `og:title, og:image, og:description` from the URL’s

* **URL**

	  api/universities/og/:url

* **Method:**

  `GET`
  
*  **URL Params**
 
	   `url=[string]      // The url-encoded web_page of the university`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
  "data": {
    "ogTitle": "Home page",
    "ogImage": "https://www.agnesscott.edu/files/images/og-images/aerial29.jpg",
    "ogDescription": "A private, liberal arts women's college in metropolitan Atlanta, Georgia. Founded in 1889, Agnes Scott College educates women to think deeply, live honorably and engage the intellectual and social challenges of their times."
  }
}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : { message: "Internal server error" } }`

  OR

  * **Code:** 404  <br />
    **Content:** `{"error":{"message":"Path Not found"}}`

OR

* **Sample Call:**

  ```javascript
    axios.get('.../api/universities/og/http%3A%2F%2Fwww.agnesscott.edu%2F')
      .then(response => console.log(response))
      .catch(error => console.error(error));
  ```

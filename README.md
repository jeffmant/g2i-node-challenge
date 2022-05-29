# Acronyms API

This's my resolution to [G2i](https://github.com/g2i) Node Challenge.

Challenge documentation: [G2i Node Challenge](https://public.3.basecamp.com/p/b7qHoMSf3CBYZ7FAqMn7XBmY)

---

## Authentication

I choose to use Basic Authentication with a static hash MD5 as token. So, we need to set in the headers `Authentication: Basic hashTokenString`

The hashTokenString is on .env file and will be used to guard PUT and DELETE routes by a middleware.

---

## Get Many

  Returns a header with total acronyms found with sent filter, and an array called **data** with a quantity of acronyms based on limit query param.

* **URL**

  /acronyms

* **Method:**

  `GET`
  
* **Query String**

  `from=[integer]`

  `limit=[integer]`

  `search=[string]`

* **Body**

  None

* **Success Response:**

  * **Code:** 200
  * **Content:**

    ```json
    { 
      "total": 10, 
      "data": [{ 
        "id": 1, 
        "title": "TDD", 
        "definition": "Test-Driven Developent"
        },
        ...
      ] 
    }
    ```

* **Error Response:**

  * **Code:** 500
  * **Content:** Server Error

---

## Get One

Returns the first found element that have the title provided in the params.

* **URL**

  /acronyms/:title

* **Method:**

  `GET`
  
* **Query String**

  None

* **Body**

  None

* **Success Response:**

  * **Code:** 200
  * **Content:**

    ```json
    { 
      "id": 1, 
      "title": "TDD", 
      "definition": "Test-Driven Developent"
    }
    ```

* **Error Response:**

  * **Code:** 500
  * **Content:** Server Error
  
  OR
  
  * **Code:** 404
  * **Content:** Not Found

---

## Create

Returns a message indicating the success on create a new one.

* **URL**

  /acronyms

* **Method:**

  `POST`
  
* **Query String**

  None

* **Body**

  ```javascript
  {
    "title": "TDD",
    "definition": "Test-Driven Development"
  }
  ```

* **Success Response:**

  * **Code:** 201
  * **Content:** Acronym created

* **Error Response:**

  * **Code:** 500
  * **Content:** Server Error
  
  OR
  
  * **Code:** 400
  * **Content:** Bad Request

---

## Update

Returns a message indicating the success on update a acronym.

* **URL**

  /acronyms/:title

* **Method:**

  `PUT`

* **Header Params**

  `Authentication: Basic <hashTokenString>`
  
* **Query String**

  None

* **Body**

  ```javascript
  {
    "title": "TDD",
    "definition": "Test-Driven Development"
  }
  ```

* **Success Response:**

  * **Code:** 200
  * **Content:** Acronym updated

* **Error Response:**

  * **Code:** 500
  * **Content:** Server Error
  
  OR
  
  * **Code:** 404
  * **Content:** Not Found
  
  OR
  
  * **Code:** 400
  * **Content:** Bad Request

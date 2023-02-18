# Notes API

A simple backend API that allows users create, read, update and delete their notes.



### Technologies

<div align="center">

  <a href="">![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)</a>
  <a href="">![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)</a>
  <a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
  
  
</div>
<div align="center">

  <a href="">![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)</a>
  <a href="">![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)</a>

</div>


### Installation
First, you need to install the dependencies.
```java
$ npm i 
```
secondly, you need to create a `.env` file and copy the `.env.example` file to it.
```java
$ cp .env.example .env 
```
Finally, you need to run the server.
```java
$ npm run start
```


### Testing
To run the test
```
npm run test
```

### Usage


#### Registration

* Route: /api/v1/auth/signup
* Method: POST
* Body:
```java
{
  email: Myemail@gmail.com,
  password: mypassword
}
```

```java
* Response:
  * 201: success || Created
  * 409: error || Conflict Error
  * 400: error || Bad Request
  * 500: error || Server Error
```

#### Login
* Route: /api/v1/auth/login
* Method: POST
* Body: 
```java
{
  email: Myemail@gmail.com,
  password: mypassword
}

```
* Response
```java
  200: success
  400: error || Bad Request
  500: error || Server Error
```

#### Create New Note
* Route: /api/v1/note
* Method: POST
* Body: 
```java
{
  title: notes title,
  body: notes content
}

```
* Response status Codes: 
```java
  201: success || Created
  401: error || Unauthorized
  400: error || Bad Request
  500: error || Server Error
```

#### Get a Note
* Route: /api/v1/note/:id
* Method: GET
* Response
```java
  200: success 
  401: error || Unauthorized
  404: error || Not Found Error
  500: error || Server Error
```

#### Get all my Notes
* Route: /api/v1/note
* Method: GET
* Query: 
  * q : queryString 
  ```java
  /api/v1/note/?q=wordToSearch
  ```
  * sort : sort notes in ascending or descending order given a specified format. To sort in descending order, add a `-` prefix before a field, seperate multiple values with a `,`.
  Accepted Values:
    * title
    * body
    * createdAt
    ```java
      /api/v1/note/?sort=title,-body,createdAt
    ```
  * page [default: 1]
  * limit [default: 20] 
  ```java
    /api/v1/note/?page=1&limit=10
  ```
* Response

```java
  200: success
  401: error || Unauthorized
  500: error || Server Error
```

#### Update a Note
* Route: /api/v1/note/:id
* Method: PATCH
* Body: 
```java
  {
    title: notes title,
    body: notes content
  }
```
* Response
```java
  200: success 
  401: error || Unauthorized
  404: error || Not Found Error
  500: error || Server Error
```

#### Delete a Note
* Route: /api/v1/note/:id
* Method: GET
* Response
```java
  200: success 
  401: error || Unauthorized
  404: error || Not Found Error
  500: error || Server Error
```
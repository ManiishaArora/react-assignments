# MyReads App

This app is a bookshelf built out of React. There are 3 kinds of book shelves available here - Currently Reading, Want to Read and Read. Users can move books from 1 shelf to another. They can search for more books and add to their existing book shelves

## TL;DR

Instructions for development:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Code Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for use with this app.
├── package.json # npm package manager file. 
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app.
    ├── App.js # Root of the app. Handles Routing between Main Page and Search Page. Also responsible for calling Backend APIs
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for backend. Instructions for the methods are below.
    ├── Components # React Components
    │   ├── Books.js #Represents a book with title,author, image and move operations
    │   ├── Main.js #Represents Main Read Page with the 3 shelves - Currently Reading, Want To Read and Read
    │   ├── Search.js #Represents Search Page with input box for search and a result set if results are found
    ├── icons # Images for the app. 
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. 
    └── index.js # Used for DOM rendering only.
```

## Backend Server

To simplify the development process, the provided file [`BooksAPI.js`](src/BooksAPI.js) is used which contains the methods needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in the app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. Caller needs to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). 

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

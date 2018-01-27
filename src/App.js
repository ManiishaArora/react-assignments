import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Main from './Components/Main'
import {Route} from 'react-router-dom'
import Books from './Components/Books'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      query:'',
      books:[]
    }
    this.moveBooks = this.moveBooks.bind(this)
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }
  
  updateQuery = (query) => {
    this.setState({query:query.trim()})
    const self = this;
    BooksAPI.getAll().then((books)=>{ //User Current books are always fetched to handle multiple tabs
      this.setState({books})
      
    }).then(function(){
      const {books} = self.state
      BooksAPI.search(query).then((searchBooks)=>{
        let myBooks = []
         searchBooks.forEach(function (searchBook,index){
          if(typeof searchBook.authors==="undefined"){
            searchBook.authors=[""]
          }
          searchBook.shelf="none" //Default Value
          books.filter((book) => book.id === searchBook.id).forEach(function (book){ //Get Shelf Status from MyReads
            searchBook.shelf=book.shelf
           // console.log(`book title: ${book.title} --- book shelf: ${book.shelf}`)
          })
          if(index===searchBooks.length-1){
            myBooks=searchBooks;
          }
         
        });
        self.setState({books:myBooks})
      }).catch((error) =>{
        console.log(error) //At times no results are returned from Search API & forEach breaks.
        self.setState({books:[]})
      })
    })
  }

  /*
    @description: This is callback function which gets triggered by Child component Books on trigger of change of read shelf
    @Input Param: changeObject: JSON Object which has following attributes: 
        i. newShelf: Value of new shelf
        ii. bookid: ID of the book which was triggered for a change of shelf from Child Component 
    */
  moveBooks(changeObject){
    BooksAPI.get(changeObject.bookid).then((book)=>{
        BooksAPI.update(book,changeObject.newShelf).then(()=>{
          const books= []
          this.state.books.forEach(function (obj,index,array){
              if(book.id===obj.id){
                  obj.shelf=changeObject.newShelf
              }
              books.push(obj)
          });
          this.setState({books})
        })
    })
    
}


  render() {
    const {query,books} = this.state
    return (
      <div className="app">
        <Route path="/search" render={()=>(
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" href="/">Close</a>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"
                  value={query} onChange={(event) => this.updateQuery(event.target.value)}/>

                </div>
              </div>
              <div className="search-books-results">
              <ol className="books-grid">
              {
                 query!=='' &&
                  books.map(
                    (book) => 
                        <Books id={book.id}  key={book.id}
                        title={book.title} author={book.authors[0]} url={book.imageLinks.thumbnail} 
                               shelf={book.shelf}
                               moveBooks={this.moveBooks}/>
                    )
              } 
              </ol>
              </div>
          </div>
        )}/>
        <Route path="/" exact render={() => <Main mainBooks={this.state.books} moveBooks={this.moveBooks} />} />
     </div>
    )  
  }
}

export default BooksApp

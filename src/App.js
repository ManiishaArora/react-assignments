import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Main from './Components/Main'
import Search from './Components/Search'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      books:[]
    }
    this.moveBooks = this.moveBooks.bind(this)
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
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
    return (
      <div className="app">
        <Route path="/search" render={()=><Search searchBooks={this.state.books} moveBooks={this.moveBooks} /> }/>
        <Route path="/" exact render={() => <Main mainBooks={this.state.books} moveBooks={this.moveBooks} />} />
     </div>
    )  
  }
}

export default BooksApp

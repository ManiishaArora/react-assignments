import React from 'react'
import {DebounceInput} from 'react-debounce-input';
import * as BooksAPI from '../BooksAPI'
import Books from './Books'

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:this.props.searchBooks,
            query:'',
            noResultsFound:false
         }
         this.moveBooks = this.moveBooks.bind(this)
     }
 
     componentWillReceiveProps(nextProps) {
        this.updateQuery(this.state.query) //So that when the book shelf is updated after a callback to parent component 'App.js', this component gets refreshed with the search term again.
                                           //Refresh has been added because state of book should be updated to new shelf
     }
     
     moveBooks(changeObject){
         this.props.moveBooks && 
             this.props.moveBooks(changeObject);
        
         
     }

     updateQuery = (query) => {
        
        this.setState({query,noResultsFound:false})
        if(query==='' || typeof query === 'undefined'){
          return
        }
        const self = this;
        
        let allBooks = []
        let updatedBooks = []
        //Step 1: Get all books, because we want refreshed data as user might be on main page and could have changed book shelf on a different window/tab of the browser
        BooksAPI.getAll().then((books)=>{ 
          allBooks = books
        }).then(function(){
          //Step 2: Now search for the user query
          BooksAPI.search(query).then((searchBooks)=>{
            
            //Step 3: Iterate only if the Fetch API returned results with books. If there's no result found, this API was returning JSON object with keys: error & items (length=0)
            if(typeof searchBooks.error === 'undefined'){
                searchBooks.forEach(function (searchBook,index){
                
                searchBook.shelf="none" //Set Default Value
                
                allBooks.filter((book) => book.id === searchBook.id).forEach(function (book){ //Update Shelf Status from MyReads
                    searchBook.shelf=book.shelf
                })

                if(index===searchBooks.length-1){
                    updatedBooks=searchBooks
                }
             
                self.setState({books:updatedBooks}) //Set books equal to result return from Search operation at the end of iteration of the search array as by then 
                })
            }

            typeof searchBooks.error !== 'undefined' &&
                self.setState({noResultsFound:true,books:[]})
            
            
          }).catch((error) =>{
            self.setState({books:[]})
          })
        })
      }

     render(){
        const {query,books,noResultsFound} = this.state
        return(
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" href="/">Close</a>
                <div className="search-books-input-wrapper">
                <DebounceInput
                minLength={1} placeholder="Search by title or author"
                value={query}
                debounceTimeout={500}
                onChange={(event) => this.updateQuery(event.target.value)}/>
                </div>
              </div>
              <div className="search-books-results">
              {
                  books.length!==0 &&
                  <ol className="books-grid">
                  {
                      books.map(
                        (book) => 
                            <Books id={book.id}  key={book.id}
                            title={book.title} author={book.authors} url={book.imageLinks} 
                                   shelf={book.shelf}
                                   moveBooks={this.moveBooks}/>
                        )
                  } 
                  </ol>
              }
              {    
                    query!=='' && noResultsFound &&
                    <h3 style={{textAlign:'center',color:'#908a8a',fontWeight:'500'}}>Sorry! No books in the inventory match the search term: '{this.state.query}'. 
                    <br/>
                    Please Try with some other search terms! </h3>
                  
              }
             
              </div>
          </div>
        )
    }
}
import React from 'react'
import Books from './Books'
export default class Main extends React.Component {
    constructor(props){
        super(props)
        this.state={
           books:this.props.mainBooks
        }
        this.moveBooks = this.moveBooks.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ books:nextProps.mainBooks})
    }
    
    moveBooks(changeObject){
        this.props.moveBooks && 
            this.props.moveBooks(changeObject)
        
    }
 
    render(){
        return(
            <div className="list-books">
            <div className="list-books-title">
            <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
                <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.state.books.filter((book)=>book.shelf==="currentlyReading").map(
                            (currentlyReadingBook,index) => 
                                <Books key={index} id={currentlyReadingBook.id}  title={currentlyReadingBook.title} author={currentlyReadingBook.authors[0]} url={currentlyReadingBook.imageLinks.thumbnail} 
                                       shelf="currentlyReading"
                                       moveBooks={this.moveBooks}/>
                            )
                    } 
                    </ol>
                </div>
                </div>
                <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.state.books.filter((book)=>book.shelf==="wantToRead").map(
                            (wantToReadBook,index) => 
                                <Books key={index} id={wantToReadBook.id} title={wantToReadBook.title} author={wantToReadBook.authors[0]} url={wantToReadBook.imageLinks.thumbnail} 
                                       shelf="wantToRead"
                                       moveBooks={this.moveBooks}/>
                            )
                    }
                    </ol>
                </div>
                </div>
                <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.state.books.filter((book)=>book.shelf==="read").map(
                            (readBook,index) => 
                                <Books key={index} id={readBook.id} title={readBook.title} author={readBook.authors[0]} url={readBook.imageLinks.thumbnail} 
                                       shelf="read"
                                       moveBooks={this.moveBooks}/>
                            )
                    }
                    </ol>
                </div>
                </div>
            </div>
            </div>
            <div className="open-search">
            <a href="/search">Add a book</a>
            </div>
        </div>
        )
    }
}
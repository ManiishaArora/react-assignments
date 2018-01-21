import React from 'react'
import Books from './Books'
export default class Main extends React.Component {
    constructor(props){
        super(props)
        this.state={
            currentlyReadingBooks:[
                {title:"To Kill a Mockingbird",author:"Harper Lee",url:"https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"},
                {title:"Ender's Game",author:"Orson Scott Card",url:"https://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"}
            ],
            wantToReadBooks:[
                {title:"1776",author:"David McCullough",url:"https://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"},
                {title:"Harry Potter and the Sorcerer's Stone",author:"J.K. Rowling",url:"https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"}
            ],
            readBooks:[
                {title:"The Hobbit",author:"J.R.R. Tolkien",url:"https://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"},
                {title:"Oh, the Places You'll Go!",author:"Seuss",url:"https://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"},
                {title:"The Adventures of Tom Sawyer",author:"Mark Twain",url:"https://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"}
            ]
        }
        this.moveBooks = this.moveBooks.bind(this)
    }

    moveBooks(changeObject){
        const oldShelf = changeObject.oldShelf;
        const newShelf = changeObject.newShelf;
        switch(oldShelf){
            case "currentlyReadingBooks":
                this.setState((prevState) => ({
                    currentlyReadingBooks:prevState.currentlyReadingBooks.filter(book => book.title !== changeObject.book.title) 
                }))
                break;
            case "wantToReadBooks":
                this.setState((prevState) => ({
                    wantToReadBooks:prevState.wantToReadBooks.filter(book => book.title !== changeObject.book.title) 
                }))
                break;
            case "readBooks":
                this.setState((prevState) => ({
                    readBooks:prevState.readBooks.filter(book => book.title !== changeObject.book.title) 
                }))
                break;
        }
        switch(newShelf){
            case "currentlyReadingBooks":
                this.setState((prevState) => ({
                    currentlyReadingBooks:prevState.currentlyReadingBooks.concat(changeObject.book) 
                }))
                break;
            case "wantToReadBooks":
                this.setState((prevState) => ({
                    wantToReadBooks:prevState.wantToReadBooks.concat(changeObject.book) 
                }))
                break;
            case "readBooks":
                this.setState((prevState) => ({
                    readBooks:prevState.readBooks.concat(changeObject.book) 
                }))
                break;
        }
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
                        this.state.currentlyReadingBooks.map(
                            (currentlyReadingBook,index) => 
                                <Books key={index}  title={currentlyReadingBook.title} author={currentlyReadingBook.author} url={currentlyReadingBook.url} 
                                       shelf="currentlyReadingBooks"
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
                        this.state.wantToReadBooks.map(
                            (wantToReadBook,index) => 
                                <Books key={index} title={wantToReadBook.title} author={wantToReadBook.author} url={wantToReadBook.url} 
                                       shelf="wantToReadBooks"
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
                        this.state.readBooks.map(
                            (readBooks,index) => 
                                <Books key={index} title={readBooks.title} author={readBooks.author} url={readBooks.url} 
                                       shelf="readBooks"
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
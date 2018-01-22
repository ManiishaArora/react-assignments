import React from 'react'

export default class Main extends React.Component {
    constructor(props){
        super(props)
        this.state={
            selected:this.props.shelf
        }
        this.moveBooks=this.moveBooks.bind(this)
    }
    moveBooks(event){
        if(this.props.moveBooks)
            this.props.moveBooks({
                newShelf:event.target.value,
                bookid:this.props.id
            })
    }
    render(){
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{backgroundImage: `url(${this.props.url})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.selected} onChange={this.moveBooks}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.author}</div>
                </div>
            </li>
        )
    }
}

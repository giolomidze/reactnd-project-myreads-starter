import React, { Component } from 'react';
import './App.css';
import ListBooks from './ListBooks';

class Shelf extends Component {
  render() {
    const { shelf, updateShelf } = this.props;
    const books = this.props.books.filter(book => book.shelf === shelf.type);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ListBooks key={shelf.type} books={books} updateShelf={updateShelf} />
        </div>
      </div>
    );
  }
}

export default Shelf;

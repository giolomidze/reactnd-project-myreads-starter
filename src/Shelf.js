import React, { Component } from 'react';
import './App.css';
import ListBooks from './ListBooks';

class Shelf extends Component {
  render() {
    const { books, shelf, updateShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ListBooks
            key={shelf.type}
            books={books}
            shelf={shelf}
            updateShelf={updateShelf}
          />
        </div>
      </div>
    );
  }
}

export default Shelf;

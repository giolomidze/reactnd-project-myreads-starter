import React, { Component } from 'react';
import './App.css';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class Shelf extends Component {
  render() {
    const { shelf, changeShelf } = this.props;
    const books = this.props.books.filter(book => book.shelf === shelf.type);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ListBooks key={shelf.type} books={books} changeShelf={changeShelf} />
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Shelf;

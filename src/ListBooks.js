import React, { Component } from 'react';
import './App.css';

class ListBooks extends Component {
  render() {
    const { books, changeShelf } = this.props;
    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      book.imageLinks && book.imageLinks.thumbnail
                        ? book.imageLinks.thumbnail
                        : ''
                    })`,
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    value={book.shelf}
                    onChange={event => changeShelf(book, event.target.value)}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {book.authors ? book.authors.map(author => author) : ''}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default ListBooks;

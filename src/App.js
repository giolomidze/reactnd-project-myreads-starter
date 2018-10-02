import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Shelf from './Shelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    shelves: [
      { type: 'currentlyReading', title: 'Currently Reading' },
      { type: 'wantToRead', title: 'Want to Read' },
      { type: 'read', title: 'Read' },
    ],
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books,
      });
    });
  }

  updateBook = shelvesPerBookIds => {
    let that = this;
    let updatedBooks = [];
    Object.keys(shelvesPerBookIds).forEach(function(bookId) {
      const shelfResult = shelvesPerBookIds[bookId];
      updatedBooks = that.state.books.map(book => {
        if (book.id === bookId) {
          book.shelf = shelfResult;
        }
        return book;
      });
    });
    that.setState({
      books: updatedBooks,
    });
  };

  updateShelf = (book, shelf) => {
    let updatedShelves = {};
    let that = this;
    BooksAPI.update(book, shelf).then(result => {
      if (shelf === 'none') {
        this.setState(currentState => ({
          books: currentState.books.filter(b => {
            return b.id !== book.id;
          }),
        }));
      }
      Object.keys(result).forEach(function(receivedShelfs) {
        result[receivedShelfs].forEach(function(bookId) {
          updatedShelves[bookId] = receivedShelfs;
        });
      });
      console.log(updatedShelves);
      that.updateBook(updatedShelves);
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={() => <Search />} />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  {this.state.shelves.map(shelf => (
                    <Shelf
                      key={shelf.title}
                      books={this.state.books}
                      shelf={shelf}
                      updateShelf={this.updateShelf}
                    />
                  ))}
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;

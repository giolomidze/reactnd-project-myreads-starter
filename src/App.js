import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import Shelf from './Shelf';

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

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            path="/search"
            render={() => (
              <Search
                userBooks={this.state.books}
                changeShelf={this.changeShelf}
              />
            )}
          />
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
                      changeShelf={this.changeShelf}
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

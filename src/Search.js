import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

class Search extends Component {
  state = {
    query: '',
    books: [],
  };

  lookUpBooks = query => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      this.setState({ books: [] });
    }
    BooksAPI.search(trimmedQuery)
      .then(books => {
        if (books.error === 'empty query') {
          this.setState({ books: [] });
        } else {
          this.setState({ books: books });
        }
      })
      .catch(() => {
        this.setState({ books: [] });
      });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={e => this.lookUpBooks(e.target.value)}
              name="search"
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results" />
        <ListBooks
          books={this.state.books}
          updateShelf={this.props.updateShelf}
        />
      </div>
    );
  }
}

export default Search;

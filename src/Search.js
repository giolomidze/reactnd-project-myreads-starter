import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    query: '',
    books: [],
  };

  /**
   * Looks up books through API by passing a query.
   * Received results are being mapped and filtered based on the existing
   * books in application's parent state to maintain the information
   * of current shelf selections.
   * @param  {String} query
   */
  lookUpBooks = query => {
    const { userBooks } = this.props;

    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      this.setState({ books: [] });
    } else {
      BooksAPI.search(trimmedQuery)
        .then(books => {
          if (books.error) {
            this.setState({ books: [] });
          } else {
            books.map(booksFromSearchResults =>
              userBooks
                .filter(userBook => userBook.id === booksFromSearchResults.id)
                .map(
                  userBook => (booksFromSearchResults.shelf = userBook.shelf)
                )
            );
            this.setState({ books: books });
          }
        })
        .catch(() => {
          this.setState({ books: [] });
        });
    }
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
          changeShelf={this.props.changeShelf}
        />
      </div>
    );
  }
}

Search.propTypes = {
  userBooks: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Search;

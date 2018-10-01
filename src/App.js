import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
    state = {
        shelves: [
            { type: 'currentlyReading', title: 'Currently Reading' },
            { type: 'wantToRead', title: 'Want to Read' },
            { type: 'read', title: 'Read' },
        ],
        books: [],
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
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
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a
                                className="close-search"
                                onClick={() =>
                                    this.setState({ showSearchPage: false })
                                }
                            >
                                Close
                            </a>
                            <div className="search-books-input-wrapper">
                                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                <input
                                    type="text"
                                    placeholder="Search by title or author"
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid" />
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {this.state.shelves.map(shelf => (
                                <ListBooks
                                    key={shelf.type}
                                    books={this.state.books}
                                    shelf={shelf}
                                    updateShelf={this.updateShelf}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>
                        Add a book
                    </a>
                </div>
            </div>
        );
    }
}

export default BooksApp;

import React, { Component } from 'react';
import './App.css';

export class ListBooks extends Component {
    render() {
        const { books, shelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books
                            .filter(book => book.shelf === shelf.type)
                            .map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div
                                                className="book-cover"
                                                style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${
                                                        book.imageLinks
                                                            .thumbnail
                                                    })`,
                                                }}
                                            />
                                            <div className="book-shelf-changer">
                                                <select>
                                                    <option
                                                        value="move"
                                                        disabled
                                                    >
                                                        Move to...
                                                    </option>
                                                    <option value="currentlyReading">
                                                        Currently Reading
                                                    </option>
                                                    <option value="wantToRead">
                                                        Want to Read
                                                    </option>
                                                    <option value="read">
                                                        Read
                                                    </option>
                                                    <option value="none">
                                                        None
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">
                                            {book.title}
                                        </div>
                                        <div className="book-authors">
                                            {book.authors.map(author => author)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        <li />
                    </ol>
                </div>
            </div>
        );
    }
}

export default ListBooks;

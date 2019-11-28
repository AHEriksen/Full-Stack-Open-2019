import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const Books = ({ books, genreBooks, show }) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres');
  const [shownBooks, setShownBooks] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const fetchBooks = async () => {
      if (selectedGenre === 'all genres') {
        if (!books.loading && books.data) {
          setShownBooks(books.data.allBooks);
        }
      }
      else {
        const { data } = await client.query({
          query: genreBooks,
          variables: { genre: selectedGenre },
        });
        setShownBooks(data.allBooks);
      }
    };

    fetchBooks();
  }, [books.data, selectedGenre]);

  const uniqueGenres = () => {
    let genres = books.data.allBooks.map(book => book.genres).flat();
    const unique = [...new Set(genres)];
    return (
      unique.map((genre, i) => <button onClick={() => setSelectedGenre(genre)} type='text' key={i}>{genre}</button>)
    );
  };

  if (!show) {
    return null;
  }
  else if (books.loading || !shownBooks)
    return <div>loading...</div>;
  else {
    return (
      <div>
        <h2>books</h2>
        <p>in genre <b>{selectedGenre}</b></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {shownBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {uniqueGenres()}
        <button type='text' onClick={() => setSelectedGenre('all genres')}>all genres</button>
      </div>
    );
  }
};

export default Books;
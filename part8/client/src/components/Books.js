import React, { useState } from 'react';

const Books = ({ result, show }) => {
  const [selectedGenre, setSelectedGenre] = useState();

  if (!show) {
    return null;
  }

  const uniqueGenres = () => {
    let genres = result.data.allBooks.map(book => book.genres).flat();
    const unique = [...new Set(genres)];
    return (
      unique.map((genre, i) => <button onClick={() => setSelectedGenre(genre)} type='text' key={i}>{genre}</button>)
    );
  };

  if (result.loading)
    return <div>loading...</div>;

  let shownBooks = result.data.allBooks;
  if (selectedGenre)
    shownBooks = shownBooks.filter((book) => book.genres.includes(selectedGenre));
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
      <button type='text' onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
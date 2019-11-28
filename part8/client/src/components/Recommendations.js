import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const Recommendations = ({ show, user, books, genreBooks }) => {
  const [favoriteBooks, setFavoriteBooks] = useState(null);
  const client = useApolloClient();

  useEffect( () => {
    const fetchBooks = async () => {
      if (!user.loading && !books.loading) {
        const { data } = await client.query({
          query: genreBooks,
          variables: { genre: user.data.me.favoriteGenre }
        });
        setFavoriteBooks(data.allBooks);
      }
    };

    fetchBooks();
  }, [books.data.allBooks, user.data.me]);

  if (!show)
    return null;

  if (user.loading || books.loading)
    return <div>loading...</div>;
  else {
    return (
      <div>
        <h1>recommendations</h1>
        <p>books in your favorite genre <b>{user.data.me.favoriteGenre}</b></p>
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
            {favoriteBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Recommendations;
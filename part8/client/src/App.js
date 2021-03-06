import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks';

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
    bookList {
      id
    }
  }
}`;

const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    genres
    id
  }
}`;

const ALL_GENRE_BOOKS = gql`
  query allGenreBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
    }
  }`;

const ME = gql`
{
  me {
    favoriteGenre
  }
}`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        id
        born 
        bookCount
      }
      genres
      id
    }
  }`;


const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => setErrorMessage(null), 10000);
  };
  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem('library-user-token');
      setToken(savedToken);
    }
  }, [token]);

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCache(response.data.addBook);
    }
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const [login] = useMutation(LOGIN, {
    onError: handleError
  });

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const user = useQuery(ME);

  const updateCache = (addedBook) => {
    const includedIn = (arr, obj) => arr.map(book => book.id).includes(obj.id);

    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(booksInStore.allBooks, addedBook)) {
      booksInStore.allBooks.push(addedBook);
      client.writeQuery({
        query: ALL_BOOKS,
        data: booksInStore
      });
    }

    const authorsInStore = client.readQuery({ query: ALL_AUTHORS });
    const index = authorsInStore.allAuthors.findIndex((author) => author.id === addedBook.author.id);
    if (index !== -1) {
      if (!includedIn(authorsInStore.allAuthors[index].bookList, addedBook)) {
        authorsInStore.allAuthors[index].bookList.push(addedBook);
      }
    }
    else {
      authorsInStore.allAuthors.push({ ...addedBook.author, bookList: [addedBook] });
    }
    client.writeQuery({
      query: ALL_AUTHORS,
      data: authorsInStore
    });

    const userInStore = client.readQuery({ query: ME });
    if (addedBook.genres.includes(userInStore.me.favoriteGenre)) {
      const genreBooksInStore = client.readQuery({ query: ALL_GENRE_BOOKS, variables: { genre: user.data.me.favoriteGenre } });
      if (!includedIn(genreBooksInStore.allBooks, addedBook)) {
        genreBooksInStore.allBooks.push(addedBook);
        client.writeQuery({
          query: ALL_GENRE_BOOKS,
          variables: { genre: user.data.me.favoriteGenre },
          data: genreBooksInStore
        });
      }
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const addedBook = subscriptionData.data.bookAdded;
      alert(`'${addedBook.title}' added`);
      updateCache(addedBook);
    }
  });


  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        {errorMessage &&
          <div style={{ color: '#8B0000' }}>
            {errorMessage}
          </div>
        }
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
          result={authors}
        />
        <Books
          show={page === 'books'}
          books={books}
          genreBooks={ALL_GENRE_BOOKS}
        />
        <LoginForm
          show={page === 'login'}
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    );
  }

  return (
    <div>
      {errorMessage &&
        <div style={{ color: '#8B0000' }}>
          {errorMessage}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recs')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} result={authors} editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        books={books}
        genreBooks={ALL_GENRE_BOOKS}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

      <Recommendations
        show={page === 'recs'}
        user={user}
        books={books}
        genreBooks={ALL_GENRE_BOOKS}
      />

    </div>
  );
};

export default App;
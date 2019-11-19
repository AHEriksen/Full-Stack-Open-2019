const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1');

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book 
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    hello: String!
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let copyBooks = [...books];
      if (args.author) {
        copyBooks = copyBooks.filter((book) => book.author === args.author);
      }
      if (args.genre) {
        copyBooks = copyBooks.filter((book) => {
          console.log(args.genre, book.genres);
          return book.genres.includes(args.genre);
        });
      }
      return copyBooks;
    },
    allAuthors: (root) => authors,
    hello: () => { return "world" }
  },
  Author: {
    bookCount: (root) => {
      const reducer = (accumulator, currentValue) => currentValue.author === root.name ? accumulator + 1 : accumulator;
      return books.reduce(reducer, 0)
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid()};
      books = books.concat(book);
      if (!authors.some((author) => author.name === book.author)) {
        const author = { name: book.author, id: uuid()};
        authors = authors.concat(author);
      }
      return book;
    },
    editAuthor: (root, args) => {
      let editedAuthor = null;  
      const author = authors.find((author) => {
        console.log(author.name);
        return author.name === args.name;
      });
      console.log(author);
      if (author) {
        editedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map((author) => author.id === editedAuthor.id ? editedAuthor : author);
      }
      return editedAuthor;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
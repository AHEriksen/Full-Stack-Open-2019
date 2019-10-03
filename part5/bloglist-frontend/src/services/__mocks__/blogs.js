const blogs = [
  {
    id: '5d84ae92a891872fd475342d',
    title: 'blogtitle1',
    author: 'blogauthor1',
    url: 'www.blog1.com',
    likes: 1,
    user: {
      _id: 'userid1',
      username: 'blogger1',
      name: 'blog blogson sr'
    }
  },
  {
    id: 'blogid2',
    title: 'blogtitle2',
    author: 'blogauthor2',
    url: 'www.blog2.com',
    likes: 2,
    user: {
      _id: 'userid2',
      username: 'blogger2',
      name: 'blog blogson jr'
    }
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = () => {};

export default { getAll, setToken };
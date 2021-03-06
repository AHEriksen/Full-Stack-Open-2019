import blogService from '../services/blogs';

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const addVote = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    blogService.update(updatedBlog);
    dispatch({
      type: 'ADD_VOTE',
      data: updatedBlog
    });
  };
};

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blog, { comment });
    dispatch({
      type: 'ADD_COMMENT',
      data: updatedBlog
    });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    blogService.remove(blog);
    dispatch({
      type: 'DELETE_BLOG',
      id: blog.id
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'ADD_VOTE':
    case 'ADD_COMMENT': {
      const updatedBlog = action.data;
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog: blog);
    }
    case 'NEW_BLOG':
      return state.concat(action.data);
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id);
    default:
      return state;
  }
};

export default reducer;
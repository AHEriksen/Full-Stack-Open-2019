import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('Component renders title, author and amount of likes', () => {
  const blog = {
    title: 'testblog',
    author: 'testauthor',
    likes: 10
  };

  const component = render(
    <SimpleBlog blog={blog} />
  );

  expect(component.container).toHaveTextContent('testblog');
  expect(component.container).toHaveTextContent('testauthor');
  expect(component.container).toHaveTextContent(10);
});
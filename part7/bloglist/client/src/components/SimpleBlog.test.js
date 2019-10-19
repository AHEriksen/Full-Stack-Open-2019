import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
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
  expect(component.container).toHaveTextContent('10');
});

test('Like button pressed twice => event handler called twice', () => {
  const blog = {
    title: 'testblog',
    author: 'testauthor',
    likes: 10
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});
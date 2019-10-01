import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Blog from './Blog';

afterEach(cleanup);

describe('info shown', () => {
  let component;
  beforeEach(() => {
    const blog = {
      title: 'testblog',
      author: 'testauthor',
      likes: 10,
      url: 'test',
      user: { name: 'tester', username: 'test' }
    };

    component = render(
      <Blog blog={blog} />
    );
  });

  test('only the name and author are shown by default', () => {

    expect(component.container).toHaveTextContent('testblog');
    expect(component.container).toHaveTextContent('testblog');
    expect(component.container).not.toHaveTextContent('10');
  });

  test('the other info becomes visible when the blog post is clicked', () => {
    const button = component.container.querySelector('.toggleOn');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('testblog');
    expect(component.container).toHaveTextContent('testblog');
    expect(component.container).toHaveTextContent('10');
  });
});


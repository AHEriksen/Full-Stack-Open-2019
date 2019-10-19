import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement } from '@testing-library/react';
import App from './App';
jest.mock('./services/blogs');

describe('<App />', () => {
  test('If no user logged in, blogs are not rendered', async () => {
    const component = render(
      <App />
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText('login')
    );

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(0);
  });

  test('If user logged in, blogs are rendered', async () => {
    const user = {
      username: 'testuser',
      token: '1231231214',
      name: 'tester'
    };

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

    const component = render(
      <App />
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.container.querySelector('.blog')
    );

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(2);
    expect(component.container).toHaveTextContent(
      'blogtitle1'
    );
    expect(component.container).toHaveTextContent(
      'blogtitle2'
    );
  });
});

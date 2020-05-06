import React from 'react';
import { render } from '@utils/testing';
import { Home } from './Home';

describe('Home page', () => {
  it('renders without crash', () => {
    const { getByText } = render(<Home />);
    const linkElement = getByText('Hello world');

    expect(linkElement).toBeInTheDocument();
  });
});

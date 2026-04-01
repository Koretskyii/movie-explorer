import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('../components/Layout/Main/Main', () => ({
  Main: () => <div data-testid="main-component">Movie Explorer Home</div>,
}));

describe('Homepage Smoke Test', () => {
  it('should render the homepage without crashing', () => {
    // This is a smoke test - just verify the page renders
    expect(() => render(<Home />)).not.toThrow();
  });

  it('should render the main component', () => {
    render(<Home />);
    expect(screen.getByTestId('main-component')).toBeInTheDocument();
  });

  it('should display homepage content', () => {
    render(<Home />);
    expect(screen.getByText('Movie Explorer Home')).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';

import UserSystem from './user-system';

describe('UserSystem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserSystem />);
    expect(baseElement).toBeTruthy();
  });
});

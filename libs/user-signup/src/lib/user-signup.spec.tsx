import { render } from '@testing-library/react';

import UserSignup from './user-signup';

describe('UserSignup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserSignup />);
    expect(baseElement).toBeTruthy();
  });
});

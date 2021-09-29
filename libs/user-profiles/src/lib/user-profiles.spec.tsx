import { render } from '@testing-library/react';

import UserProfiles from './user-profiles';

describe('UserProfiles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProfiles />);
    expect(baseElement).toBeTruthy();
  });
});

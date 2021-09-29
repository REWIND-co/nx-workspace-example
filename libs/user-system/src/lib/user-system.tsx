import { UserSignup } from '@nx-workspace-example/user-signup';
import { UserProfiles } from '@nx-workspace-example/user-profiles';

/* eslint-disable-next-line */
export interface UserSystemProps {}

export function UserSystem(props: UserSystemProps) {
  return (
    <div>
      <h1>Welcome to UserSystem!</h1>
    </div>
  );
}

export default UserSystem;

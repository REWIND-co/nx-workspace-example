import { GravityComponent } from './components/GravityComponent/GravityComponent';

import { MovementComponent } from './components/MovementComponent/MovementComponent';
export class ECS {
  constructor() {
    this.register();
  }

  register() {
    //register component here
    this.registerComponent(GravityComponent);
    this.registerComponent(MovementComponent);
  }

  registerComponent(component: any) {
    //ECS system register code.
  }
}

import {User} from './user';

export class Task {
  constructor(public id: number, public user: User,  public description: string, public progress: number) {
  }
}

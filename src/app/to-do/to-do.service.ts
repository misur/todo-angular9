import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserData} from '../to-do.component';

@Injectable()
export class ToDoService {
  users = [];

  protected _COLORS: string[] = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
    'aqua', 'blue', 'navy', 'black', 'gray'
  ];
  protected _NAMES: string[] = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
  ];


  constructor(private http: HttpClient) {
    this.users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
  }


  get COLORS(): string[] {
    return this._COLORS;
  }

  set COLORS(value: string[]) {
    this._COLORS = value;
  }

  get NAMES(): string[] {
    return this._NAMES;
  }

  set NAMES(value: string[]) {
    this._NAMES = value;
  }

  getList() {
    // Create 100 users
    return this.users;
  }

  getNumberOfCompletedTasks() {
    return this.users.filter(value =>  value.progress > 80).length;
  }


  createNewUser(id: number): UserData {
    const name = this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))] + ' ' +
      this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))].charAt(0) + '.';

    return {
      id: id.toString(),
      name,
      progress: Math.round(Math.random() * 100).toString(),
      color: this.COLORS[Math.round(Math.random() * (this.COLORS.length - 1))],
      description: 'test',
      complete: false
    };
  }

}

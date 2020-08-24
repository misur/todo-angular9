import {Component} from '@angular/core';
import {Task} from '../model/task';

@Component({
  selector: 'side-bar-item',
  template: `<span> {{task.description}} -  {{task.user.name}}</span>`,
  inputs: ['task']
})
export  class  SidebarItemComponent{
  task: Task;
  constructor() {
  }
}



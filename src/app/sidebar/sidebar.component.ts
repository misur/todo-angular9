import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {User} from '../model/user';
import {SidebarItemComponent} from './sidebar-item.component';
import {ToDoService} from '../to-do/to-do.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  providers: [ToDoService]
})
export class SidebarComponent implements OnInit {
  task: Task;
  tasks: Task [];
  completed: number;

  constructor(todoService: ToDoService) {
    this.task = new Task(212132, new User('milos', 'misurovic', 29), 'clean the badroom', 2);
    this.completed = todoService.getNumberOfCompletedTasks();
  }

  ngOnInit() {
    this.tasks = [];
    this.tasks.push(new Task(212132, new User('milos', 'misurovic', 29), 'clean the bedroom', 2));
    this.tasks.push(new Task(212132, new User('milos', 'misurovic', 29), 'buy a new car', 2));
  }
}

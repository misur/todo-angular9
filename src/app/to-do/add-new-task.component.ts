import {Component} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Task} from '../model/task';
import {User} from '../model/user';
import {ToDoService} from './to-do.service';

@Component({
  selector: 'add-new-task',
  templateUrl: './add-new-task.view.html',
  providers: [ToDoService]
})
export class AddNewTaskComponent {
  addNewTaskForm: FormGroup;
  task: Task;

  constructor(private formBuilder: FormBuilder, private todoService: ToDoService) {
    this.addNewTaskForm = formBuilder.group({
      description: ['', Validators.required]
    });
    this.task = null;
    this.todoService.httpService().subscribe(data => console.log(data));
  }

  onSubmit() {
    console.log(this.addNewTaskForm.value);
    this.task = new Task(212, new User('milos', 'misurovic', 22), this.addNewTaskForm.value.description, 0);
  }
}

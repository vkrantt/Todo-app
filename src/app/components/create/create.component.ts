import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private toast: HotToastService) {}

  duration: any = { duration: 500 };
  todos: any;
  title: any;
  id = 1;
  completed = false;
  update = false;
  label = 'Add';

  ngOnInit(): void {
    const data = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos') as string)
      : [];
    this.todos = data;
  }

  setValue() {
    if (!this.title) {
      this.toast.error('Empty field', this.duration);
      return;
    } else if (this.update) {
      this.toast.success('Task updated', this.duration);
      this.title = '';
      this.label = 'Add';
    } else {
      this.todos.push({
        id: ++this.id,
        task: this.title,
        completed: this.completed,
      });
      this.title = '';
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.toast.success('Task added', this.duration);
    }
  }

  valueChange(e: any) {
    this.title = e;
  }

  completedvalueChange(id: any) {
    let todo = this.todos.filter((x: any) => x.id === id)[0];
    if (todo.completed) {
      todo.completed = false;
      this.toast.info('Task incomplete', this.duration);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    } else {
      todo.completed = true;
      this.toast.info('Task completed', this.duration);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  removeItem(id: any) {
    this.todos = this.todos.filter((x: any) => x.id != id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.toast.success('Task deleted', this.duration);
  }

  editItem(id: any) {
    let todo = this.todos.filter((x: any) => x.id === id)[0];
    this.title = todo.task;
    this.update = true;
    this.label = 'Update';
  }
}

import { TodoService } from './../../core/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-bands-layout',
  templateUrl: './bands-layout.component.html',
  styleUrls: ['./bands-layout.component.scss']
})

export class BandsLayoutComponent implements OnInit
{
  newTodo: any;

  constructor(private todoService : TodoService)
  {
  }

  ngOnInit()
  {
    // this.newTodo = { title: 'play guitar', tasks: [] }

    // this.todoService.createTodo(this.newTodo).subscribe((res) => {
    //   console.log(res);
    //   this.newTodo = {};
    // });

    this.todoService.getTodos().subscribe((res) => {
      console.log(res);
    });
  }
}

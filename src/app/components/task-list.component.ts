import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // <-- ADD THIS
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],  // <-- ADD THIS
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }
}

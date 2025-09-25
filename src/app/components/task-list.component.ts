import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', completed: false };
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔹 Load all tasks
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  // 🔹 Add a new task
addTask(): void {
  if (!this.newTask.title.trim()) return;

  this.taskService.createTask(this.newTask).subscribe({
    next: (task) => {
      this.tasks.push(task);
      this.newTask = { title: '', description: '', completed: false } as Task; 
    },
    error: (err) => console.error('Error creating task:', err),
  });
}

  // 🔹 Enter edit mode
  editTask(task: Task): void {
    this.editingTask = { ...task }; // copy task
  }

// Update a task
updateTask(): void {
  if (!this.editingTask || !this.editingTask.id) {
    console.error('Task ID is missing, cannot update.');
    return;
  }

  this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe({
    next: (updatedTask) => {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) this.tasks[index] = updatedTask;
      this.editingTask = null;
    },
    error: (err) => console.error('Error updating task:', err),
  });
}

  // 🔹 Delete a task
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => (this.tasks = this.tasks.filter((t) => t.id !== id)),
      error: (err) => console.error('Error deleting task:', err),
    });
  }
}

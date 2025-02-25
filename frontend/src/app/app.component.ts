import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SocketService } from './socket.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle = '';
  editingTask: any = null;
  lockedTasks = new Map<string, string>(); // taskId as string

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService
      .getInitialTasks()
      .subscribe((tasks) => (this.tasks = tasks));
    this.socketService
      .getTasksUpdated()
      .subscribe((tasks) => (this.tasks = tasks));
    this.socketService.getTaskLocked().subscribe(({ taskId, clientId }) => {
      this.lockedTasks.set(taskId, clientId);
    });
    this.socketService.getTaskUnlocked().subscribe((taskId) => {
      this.lockedTasks.delete(taskId);
    });
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.socketService.addTask({ title: this.newTaskTitle.trim() });
      this.newTaskTitle = '';
    }
  }

  startEditing(task: any) {
    if (!this.isLocked(task._id)) {
      this.socketService.editTask(task._id); // Use _id as string
      this.editingTask = { ...task };
    }
  }

  saveEdit() {
    if (this.editingTask && this.editingTask.title.trim()) {
      this.socketService.updateTask(this.editingTask);
      this.editingTask = null; // Clear editing state after save
    }
  }

  cancelEdit() {
    if (this.editingTask) {
      this.socketService.releaseLock(this.editingTask._id);
      this.editingTask = null; // Clear editing state
    }
  }

  deleteTask(taskId: string) {
    // taskId as string
    if (!this.isLocked(taskId)) {
      this.socketService.deleteTask(taskId);
    }
  }

  toggleCompleted(task: any) {
    if (!this.isLocked(task._id)) {
      this.socketService.updateTask({ ...task, completed: !task.completed });
    }
  }

  isLocked(taskId: string): boolean {
    // taskId as string
    return (
      this.lockedTasks.has(taskId) &&
      this.lockedTasks.get(taskId) !== this.socketService.socketId
    );
  }

  isEditing(taskId: string): boolean {
    // taskId as string
    return this.editingTask && this.editingTask._id === taskId; // Compare _id correctly
  }
}

import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket = io('http://localhost:3000');

  constructor() {
    this.socket.on('connect', () => {
      this.socketId = this.socket.id || '';
    });
  }

  socketId: string = '';

  getInitialTasks(): Observable<any[]> {
    return new Observable((observer) => {
      this.socket.on('initialTasks', (tasks) => observer.next(tasks));
    });
  }

  getTasksUpdated(): Observable<any[]> {
    return new Observable((observer) => {
      this.socket.on('tasksUpdated', (tasks) => observer.next(tasks));
    });
  }

  getTaskLocked(): Observable<{ taskId: string; clientId: string }> {
    // taskId as string
    return new Observable((observer) => {
      this.socket.on('taskLocked', (data) => observer.next(data));
    });
  }

  getTaskUnlocked(): Observable<string> {
    // taskId as string
    return new Observable((observer) => {
      this.socket.on('taskUnlocked', (taskId) => observer.next(taskId));
    });
  }

  addTask(task: any) {
    this.socket.emit('addTask', task);
  }

  editTask(taskId: string) {
    // taskId as string
    this.socket.emit('editTask', { taskId, clientId: this.socketId });
  }

  updateTask(task: any) {
    this.socket.emit('updateTask', task);
  }

  deleteTask(taskId: string) {
    // taskId as string
    this.socket.emit('deleteTask', taskId);
  }

  releaseLock(taskId: string) {
    // taskId as string
    this.socket.emit('releaseLock', taskId);
  }
}

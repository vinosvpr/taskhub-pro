import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { TaskService } from '../../../core/services/task.service';
import { LoaderService } from '../../../core/services/loader.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { HighlightStatusDirective } from '../../../shared/directives/highlight-status.directive';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HighlightStatusDirective],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  searchText = '';
  constructor(
    private taskService: TaskService,
    private loaderService: LoaderService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.loaderService.show();

    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;

        this.loaderService.hide();
      },

      error: () => {
        this.loaderService.hide();
      },
    });
  }

  trackByTask(index: number, task: any) {
    return task.id;
  }
  filteredTasks() {
    return this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }
}

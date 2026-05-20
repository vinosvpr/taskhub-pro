import { Routes } from '@angular/router';

import { TaskListComponent } from './task-list/task-list.component';

import { TaskFormComponent } from './task-form/task-form.component';

import { TaskDetailComponent } from './task-detail/task-detail.component';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },

  {
    path: 'create',
    component: TaskFormComponent,
  },

  {
    path: ':id',
    component: TaskDetailComponent,
  },
];

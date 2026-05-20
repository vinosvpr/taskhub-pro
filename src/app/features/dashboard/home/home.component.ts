import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import {
  NgApexchartsModule,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexLegend,
} from 'ng-apexcharts';

import { TaskService } from '../../../core/services/task.service';
import { LoaderService } from '../../../core/services/loader.service';
import { AuthService } from '../../../core/services/auth.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;

  chart: ApexChart;

  responsive: ApexResponsive[];

  labels: any;

  legend: ApexLegend;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  totalTasks = 0;

  completedTasks = 0;

  pendingTasks = 0;

  public chartOptions!: ChartOptions;

  constructor(
    private taskService: TaskService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.taskService.getTasks().subscribe((res) => {
      this.totalTasks = res.length;

      this.completedTasks = res.filter((x) => x.status === 'Completed').length;

      this.pendingTasks = res.filter((x) => x.status === 'Pending').length;

      this.chartOptions = {
        series: [this.completedTasks, this.pendingTasks],

        chart: {
          type: 'donut',
          height: 350,
        },

        labels: ['Completed', 'Pending'],

        legend: {
          position: 'bottom',
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
            },
          },
        ],
      };
    });
  }
}

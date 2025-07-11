import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import IWorkshop from '../models/IWorkshop';
import { LocationPipe } from '../../common/location/location-pipe';
import { WorkshopsService } from '../workshops';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  ActivatedRoute,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-workshop-details',
  imports: [
    DatePipe,
    LocationPipe,
    LoadingSpinner,
    ErrorAlert,
    FontAwesomeModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './workshop-details.html',
  styleUrl: './workshop-details.scss',
})
export class WorkshopDetails implements OnInit {
  loading = true;
  error: Error | null = null;
  workshop!: IWorkshop;
  workshopId!: number;

  icons = {
    // The below is just ES2015+ short for faCheckCircle: faCheckCircle,
    faCheckCircle,
    faTimesCircle,
  };

  constructor(
    private workshopsService: WorkshopsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const idStr = params.get('id');
        this.workshopId = +(idStr as string);

        this.workshopsService.getWorkshopById(this.workshopId).subscribe({
          next: (workshop) => {
            this.workshop = workshop;
            this.loading = false;
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
          },
        });
      },
    });
  }
}

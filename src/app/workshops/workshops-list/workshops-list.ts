import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../workshops';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import IWorkshop from '../models/IWorkshop';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { Item } from './item/item';
import { Pagination } from '../../common/pagination/pagination';
import { ToastService } from '../../common/toast';

@Component({
  selector: 'app-workshops-list',
  imports: [
    CommonModule,
    LoadingSpinner,
    ErrorAlert,
    Item,
    Pagination,
    FormsModule,
  ],
  templateUrl: './workshops-list.html',
  styleUrl: './workshops-list.scss',
})
export class WorkshopsList implements OnInit {
  workshops!: IWorkshop[];
  filteredWorkshops!: IWorkshop[];

  error: Error | null = null;
  loading = true;
  page = 1;
  filterKey = '';

  constructor(
    private workshopsService: WorkshopsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.workshopsService.doSomething();
  }

  getWorkshops() {
    this.workshopsService.getWorkshops(this.page).subscribe({
      next: (workshops) => {
        this.workshops = workshops;
        this.filterWorkshops();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching workshops:', err);
        this.error = err;
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.queryParamMap.subscribe({
      next: (queryParams) => {
        const queryStr = queryParams.get('page');

        // when the page loads for the first time, there is no `page` query string parameter -> so we set page to 1. Later on there is some `page` value
        if (queryStr === null) {
          this.page = 1;
        } else {
          this.page = +queryStr; // convert `page` from string type to number
        }

        this.getWorkshops(); // page has changed -> get fresh data
      },
    });
    // this.getWorkshops();
  }

  changePage(newPage: number) {
    this.page = newPage;

    this.router.navigate(['/workshops'], {
      queryParams: {
        page: this.page,
      },
    });
  }

  filterWorkshops() {
    this.filteredWorkshops = this.workshops.filter((w) =>
      w.name.toLowerCase().includes(this.filterKey.toLowerCase())
    );
  }

  filterByCategory(category: string) {
    this.workshopsService.getWorkshops(this.page).subscribe({
      next: (workshops) => {
        this.workshops = workshops;
        // A better alternative: If you make `this.workshops` and `this.filterKey` as signals, you can compute `this.filteredWorkshops` automatically when either `this.workshops` changes or `this.filterKey` changes
        this.filterWorkshops();
      },
    });
  }

  deleteWorkshop(workshop: IWorkshop) {
    console.log(workshop);

    this.workshopsService.deleteWorkshopById(workshop.id).subscribe({
      next: () => {
        this.toastService.add({
          message: `Deleted workshop with id = ${workshop.id}`,
          className: 'bg-success text-light',
          duration: 5000,
        });
        // update this.workshops
        this.workshops = this.workshops.filter((w) => w.id !== workshop.id);
        this.filterWorkshops();
      },
      error: () => {
        this.toastService.add({
          message: `Could not delete workshop with id = ${workshop.id}`,
          className: 'bg-danger text-light',
          duration: 5000,
        });
      },
    });
  }
}

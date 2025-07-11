import { Component, Input } from '@angular/core';
import IWorkshop from '../../models/IWorkshop';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationPipe } from '../../../common/location/location-pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  imports: [
    RouterModule,
    DatePipe,
    LocationPipe,
    RouterLink,
    FontAwesomeModule,
  ],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class Item {
  @Input()
  workshop!: IWorkshop;

  icons = {
    faPencil,
    faTrash,
  };

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}

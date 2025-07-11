import { Component, Input } from '@angular/core';
import IWorkshop from '../../models/IWorkshop';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationPipe } from '../../../common/location/location-pipe';

@Component({
  selector: 'app-item',
  imports: [RouterModule, DatePipe, LocationPipe, RouterLink],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class Item {
  @Input()
  workshop!: IWorkshop;

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}

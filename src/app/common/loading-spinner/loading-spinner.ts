import { Component, Input } from '@angular/core';
import { Theme } from '../../models/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner {
  @Input()
  variant: Theme = 'dark';
}

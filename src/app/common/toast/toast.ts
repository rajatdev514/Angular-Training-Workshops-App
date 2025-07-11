import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast';

@Component({
  selector: 'app-toast',
  imports: [NgbToastModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  public toastService = inject(ToastService);
}

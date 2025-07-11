import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input()
  loading: boolean = false;
  @Input()
  page: number = 1;

  // changePage(by: number) {}

  @Output()
  pageChange = new EventEmitter<number>();

  changePage(by: number) {
    if (this.page + by <= 0) {
      return;
    }

    // communicate the new page number to the parent
    this.pageChange.emit(this.page + by);
  }
}

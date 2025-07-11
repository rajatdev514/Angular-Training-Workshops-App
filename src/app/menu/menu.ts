import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [NgbModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
isNavbarCollapsed = true;
}

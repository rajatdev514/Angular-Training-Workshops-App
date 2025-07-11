import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Menu } from './menu/menu';
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgbAlert, CommonModule, Menu, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'workshops-app';
  count = 0;
  isOpen = true;

  increment() {
    this.count++;
  }

  toggle(){
    // alert('closed');
    this.isOpen = false;
  }
}

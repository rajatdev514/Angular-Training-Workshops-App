import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-session',
  imports: [RouterLink, FormsModule, JsonPipe],
  templateUrl: './add-session.html',
  styleUrl: './add-session.scss',
})
export class AddSession {}

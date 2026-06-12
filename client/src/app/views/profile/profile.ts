import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: ` <div class="card"></div> `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto;
    }
    .card {
      background-color: white;
      min-width: 500px;
    }
  `,
})
export class Profile {}

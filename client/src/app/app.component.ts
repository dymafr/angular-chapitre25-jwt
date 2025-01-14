import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header class="flex align-items-center shadow" />
    <div class="flex-auto flex flex-col">
      <router-outlet />
    </div>
    <app-footer class="flex align-items-center justify-content-center" />
  `,
  styles: `:host { min-height: 100vh; display: flex; flex-direction: column; }`,
})
export class AppComponent {}

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.scss',
})
export class WelcomeComponent {
  protected readonly title = signal('steveen');
}

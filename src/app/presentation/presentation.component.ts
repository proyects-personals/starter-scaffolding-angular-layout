import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingOverlayComponent } from './aplication/controls/loading/loading-overlay.component';

@Component({
  selector: 'app-presentation',
  imports: [RouterOutlet, LoadingOverlayComponent],
  templateUrl: './presentation.component.html',
})
export class Presentation {}

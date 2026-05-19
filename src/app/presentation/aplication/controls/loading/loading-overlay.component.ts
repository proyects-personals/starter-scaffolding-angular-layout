import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '@/app/application/common/services';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './loading-overlay.component.html',
})
export class LoadingOverlayComponent {
  public readonly type = input<'spinner' | 'logo' | 'mixed'>('mixed');
  public readonly loadingService = inject(LoadingService);
}

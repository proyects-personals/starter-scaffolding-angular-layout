import { UserAttributesService } from '@/app/application';
import { Component, effect, inject } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.html',
})
export class HomeComponent {
  readonly #userAttributesService = inject(UserAttributesService);

  constructor() {
    void this.#userAttributesService.loadUserAttributes();

    effect(() => {
      this.#userAttributesService.attributes();
    });
  }
}

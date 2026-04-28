import type { OnDestroy } from '@angular/core';
import { Component, input, output, effect } from '@angular/core';
import { MessageModule } from 'primeng/message';

/**
 * @constant ERROR_MESSAGE_TIMEOUT
 * @description Tiempo de auto-cierre del mensaje de error (ms).
 */
const ERROR_MESSAGE_TIMEOUT = 15000;

/**
 * @class ErrorMessageComponent
 * @description
 * Componente reutilizable para mostrar mensajes de error.
 * Se autodestruye después de un tiempo configurado.
 */
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  imports: [MessageModule],
})
export class ErrorMessageComponent implements OnDestroy {
  /**
   * @input message
   * @description Mensaje de error a mostrar.
   */
  public readonly message = input<string | null>(null);

  /**
   * @output closed
   * @description Evento emitido cuando el mensaje se cierra automáticamente o manualmente.
   */
  public readonly closed = output<void>();

  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect((): void => {
      const currentMessage = this.message();
      this.clearTimer();

      if (currentMessage) {
        this.startTimer();
      }
    });
  }

  /**
   * @method startTimer
   * @description Inicia el temporizador de auto-cierre.
   */
  private startTimer(): void {
    this.timerId = setTimeout((): void => {
      this.onClose();
    }, ERROR_MESSAGE_TIMEOUT);
  }

  /**
   * @method onClose
   * @description Emite evento de cierre del mensaje.
   */
  public onClose(): void {
    this.clearTimer();
    this.closed.emit();
  }

  /**
   * @method clearTimer
   * @description Limpia el temporizador activo.
   */
  private clearTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * @method ngOnDestroy
   * @description Limpieza de recursos al destruir el componente.
   */
  public ngOnDestroy(): void {
    this.clearTimer();
  }
}

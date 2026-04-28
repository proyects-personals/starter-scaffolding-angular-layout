import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import type { AppError } from '@/app/domain';

/**
 * Servicio centralizado de manejo de errores.
 *
 * Responsabilidad:
 * - Normalizar cualquier tipo de error a un mensaje legible para UI
 * - Evitar fugas de detalles técnicos del backend
 * - Garantizar seguridad de tipado en runtime y compile time
 */
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  /**
   * Punto de entrada público.
   * Convierte cualquier error en un mensaje seguro para la interfaz.
   */
  public map(error: AppError): string {
    return this.resolve(error);
  }

  /**
   * Orquesta la resolución del error usando múltiples estrategias.
   */
  private resolve(error: AppError): string {
    if (!error) return this.defaultMessage();

    return (
      this.fromString(error) ??
      this.fromHttpError(error) ??
      this.fromNativeError(error) ??
      this.fromObject(error) ??
      this.defaultMessage()
    );
  }

  /**
   * Manejo de errores tipo string.
   */
  private fromString(error: AppError): string | null {
    return typeof error === 'string' ? error : null;
  }

  /**
   * Manejo de errores HTTP de Angular.
   *
   * Extrae mensajes del backend de forma segura sin asumir estructura.
   */
  private fromHttpError(error: AppError): string | null {
    if (!(error instanceof HttpErrorResponse)) return null;

    const backendError: unknown = error.error;

    if (!this.isRecord(backendError)) {
      return error.message ?? null;
    }

    return this.extractMessage(backendError) ?? error.message ?? null;
  }

  /**
   * Manejo de errores nativos de JavaScript.
   */
  private fromNativeError(error: AppError): string | null {
    return error instanceof Error ? error.message : null;
  }

  /**
   * Manejo de errores tipo objeto genérico.
   */
  private fromObject(error: AppError): string | null {
    if (!this.isRecord(error)) return null;

    return this.extractMessage(error);
  }

  /**
   * Type guard seguro para objetos genéricos.
   */
  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  /**
   * Extrae el campo message de forma segura sin casts ni any.
   */
  private extractMessage(obj: Record<string, unknown>): string | null {
    const message = obj['message'];

    return typeof message === 'string' ? message : null;
  }

  /**
   * Mensaje por defecto cuando no se puede interpretar el error.
   */
  private defaultMessage(): string {
    return 'Error desconocido';
  }
}

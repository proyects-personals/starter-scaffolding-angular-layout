import type { HttpErrorResponse } from '@angular/common/http';

/**
 * Tipos de error soportados por la app.
 * Representa las posibles formas de error que pueden llegar a la capa de dominio/UI.
 */
export type AppError = Error | HttpErrorResponse | string | Record<string, unknown>;

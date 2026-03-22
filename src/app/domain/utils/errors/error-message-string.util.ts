import { MESSAGE_PREFIX_LENGTH, PATTERN_NOT_FOUND } from '@/app';
import { errorMapTranslatedUtil } from './error-map-translated.util';

export function errorMessageStringUtil(error: unknown): string {
  const mapError: Error = errorMapTranslatedUtil(error);

  let message: string = mapError.message;
  const patternIndex: number = message.lastIndexOf(': ');

  if (patternIndex !== PATTERN_NOT_FOUND) {
    message = message.substring(patternIndex + MESSAGE_PREFIX_LENGTH);
  }

  return message;
}

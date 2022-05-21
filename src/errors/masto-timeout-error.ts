import { MastoError, MastoErrorDetails } from './masto-error.ts';

/**
 * Mastodon Timeout error
 * @param message Message for users
 */
export class MastoTimeoutError extends MastoError {
  readonly name = 'MastoTimeoutError';

  constructor(
    message: string,
    description?: string,
    details?: MastoErrorDetails,
  ) {
    super(message, undefined, description, details);
  }
}

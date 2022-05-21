import { MastoError, MastoErrorDetails } from './masto-error.ts';

/**
 * Mastodon forbidden error
 */
export class MastoConflictError extends MastoError {
  readonly name = 'MastoConflictError';

  constructor(
    readonly message: string,
    readonly description?: string,
    readonly details?: MastoErrorDetails,
  ) {
    super(message, 409, description, details);
  }
}

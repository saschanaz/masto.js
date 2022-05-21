import * as semver from 'https://deno.land/x/semver@v1.4.0/mod.ts';

import { MastoNotFoundError } from '../errors/index.ts';

export interface Version {
  readonly version: string;
}

export interface AvailableParams {
  since?: `${number}.${number}.${number}`;
  until?: `${number}.${number}.${number}`;
}

/**
 * Decorator that verifies the version of the Mastodon instance
 * @param parameters Optional params
 */
export const version =
  ({ since, until }: AvailableParams) =>
  (
    _version: Version,
    name: string | symbol,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) => {
    const original = descriptor.value;

    if (!original) {
      throw new Error('available can only apply to a method of a class');
    }

    descriptor.value = function (
      this: Version,
      ...args: Parameters<typeof original>
    ) {
      if (since && semver.lt(this.version, since, { loose: true })) {
        throw new MastoNotFoundError(
          `${String(name)} is not available with the current ` +
            `Mastodon version ${this.version}. ` +
            `It requires greater than or equal to version ${since}.`,
        );
      }

      if (until && semver.gt(this.version, until, { loose: true })) {
        throw new MastoNotFoundError(
          `${String(name)} is not available with the current ` +
            `Mastodon version ${this.version}. ` +
            `It was removed on version ${until}.`,
        );
      }

      return original.apply(this, args);
    };
  };

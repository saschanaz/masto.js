import { version } from '../decorators/index.ts';
import { Account } from '../entities/index.ts';
import { Http } from '../http/index.ts';
import { Paginator } from '../paginator.ts';
import { DefaultPaginationParams, Repository } from '../repository.ts';

export class EndorsementRepository implements Repository<Account> {
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * Accounts that the user is currently featuring on their profile.
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/endorsements/
   */
  @version({ since: '2.5.0' })
  getIterator(
    params?: DefaultPaginationParams,
  ): Paginator<DefaultPaginationParams, Account[]> {
    return new Paginator(this.http, `/api/v1/endorsements`, params);
  }
}

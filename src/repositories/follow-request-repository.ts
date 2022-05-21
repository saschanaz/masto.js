import { version } from '../decorators/index.ts';
import { Account } from '../entities/index.ts';
import { Http } from '../http/index.ts';
import { Paginator } from '../paginator.ts';
import { DefaultPaginationParams, Repository } from '../repository.ts';

export class FollowRequestRepository implements Repository<Account> {
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * Pending Follows
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
   */
  @version({ since: '0.0.0' })
  getIterator(
    params?: DefaultPaginationParams,
  ): Paginator<DefaultPaginationParams, Account[]> {
    return new Paginator(this.http, `/api/v1/follow_requests`, params);
  }

  /**
   * Accept Follow
   * @param id ID of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
   */
  @version({ since: '0.0.0' })
  authorize(id: string) {
    return this.http.post(`/api/v1/follow_requests/${id}/authorize`);
  }

  /**
   * Reject Follow
   * @param id ID of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
   */
  @version({ since: '0.0.0' })
  reject(id: string) {
    return this.http.post(`/api/v1/follow_requests/${id}/reject`);
  }
}

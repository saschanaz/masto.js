import { version } from '../decorators/index.ts';
import { Account } from '../entities/index.ts';
import { Http } from '../http/index.ts';
import { Repository } from '../repository.ts';

export type DirectoryOrderType = 'active' | 'new';

export interface FetchDirectoryParams {
  /** How many accounts to load. Default 40. */
  readonly limit?: number | null;
  /** How many accounts to skip before returning results. Default 0. */
  readonly offset?: number | null;
  /** `active` to sort by most recently posted statuses (default) or `new` to sort by most recently created profiles. */
  readonly order?: DirectoryOrderType | null;
  /** Only return local accounts. */
  readonly local?: boolean | null;
}

export class DirectoryRepository
  implements Repository<Account, never, never, FetchDirectoryParams>
{
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * List accounts visible in the directory.
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/instance/directory/
   */
  @version({ since: '3.0.0' })
  fetchAll(params?: FetchDirectoryParams) {
    return this.http.get<Account[]>('/api/v1/directory', params);
  }
}

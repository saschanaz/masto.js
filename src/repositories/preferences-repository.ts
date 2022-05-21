import { version } from '../decorators/index.ts';
import { Preference } from '../entities/index.ts';
import { Http } from '../http/index.ts';
import { Repository } from '../repository.ts';

export class PreferenceRepository implements Repository<Preference> {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Preferences defined by the user in their account settings.
   * @return Preferences by key and value
   * @see https://docs.joinmastodon.org/methods/accounts/preferences/
   */
  @version({ since: '2.8.0' })
  fetch() {
    return this.http.get<Preference>('/api/v1/preferences');
  }
}

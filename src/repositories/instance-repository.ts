import { version } from '../decorators/index.ts';
import { Activity, Instance } from '../entities/index.ts';
import { Http } from '../http/index.ts';
import { Repository } from '../repository.ts';

export class InstanceRepository implements Repository<Instance> {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Information about the server.
   * @return Instance
   * @see https://docs.joinmastodon.org/methods/instance/
   */
  @version({ since: '1.0.0' })
  fetch() {
    return this.http.get<Instance>('/api/v1/instance');
  }

  /**
   * Domains that this instance is aware of.
   * @return Array of Activity
   * @see https://docs.joinmastodon.org/methods/instance/
   */
  @version({ since: '2.1.2' })
  fetchPeers() {
    return this.http.get<string[]>('/api/v1/instance/peers');
  }

  /**
   * Instance activity over the last 3 months, binned weekly.
   * @return Array of Activity
   * @see https://docs.joinmastodon.org/methods/instance/
   */
  @version({ since: '2.1.2' })
  fetchActivity() {
    return this.http.get<Activity[]>('/api/v1/instance/activity');
  }
}

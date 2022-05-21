import { version } from '../decorators/index.ts';
import type { Client } from '../entities/index.ts';
import type { Http } from '../http/index.ts';
import type { Repository } from '../repository.ts';

export interface CreateAppParams {
  /** A name of your application */
  readonly clientName: string;
  /**
   * Where the user should be redirected after authorization.
   * To display the authorization code to the user instead of redirecting to a web page,
   * use `urn:ietf:wg:oauth:2.0:oob` in this parameter.
   */
  readonly redirectUris: string;
  /** Space separated list of scopes. If none is provided, defaults to `read`. */
  readonly scopes: string;
  /** URL to the homepage of your app */
  readonly website?: string | null;
}

export class AppRepository implements Repository<Client, CreateAppParams> {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Create a new application to obtain OAuth2 credentials.
   * @param params Parameters
   * @return Returns App with `client_id` and `client_secret`
   * @see https://docs.joinmastodon.org/methods/apps/
   */
  @version({ since: '0.0.0' })
  create(params: CreateAppParams) {
    return this.http.post<Client>(`/api/v1/apps`, params);
  }

  /**
   * Confirm that the app's OAuth2 credentials work.
   * @return Application
   * @see https://docs.joinmastodon.org/methods/apps/
   */
  @version({ since: '2.0.0' })
  verifyCredentials() {
    return this.http.get<Client>(`/api/v1/apps/verify_credentials`);
  }
}

import { version } from '../decorators/index.ts';
import { ScheduledStatus } from '../entities/index.ts';
import { Http } from '../http/index.ts';
import { Paginator } from '../paginator.ts';
import { DefaultPaginationParams } from '../repository.ts';

export interface UpdateScheduledStatusParams {
  /** ISO 8601 Date-time at which the status will be published. Must be at least 5 minutes into the future. */
  readonly scheduledAt: string;
}

export class ScheduledStatusesRepository
  implements AsyncIterable<ScheduledStatus[]>
{
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * View scheduled statuses
   * @param params Parameters
   * @return Array of ScheduledStatus
   * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
   */
  @version({ since: '2.7.0' })
  getIterator(
    params?: DefaultPaginationParams,
  ): Paginator<DefaultPaginationParams, ScheduledStatus[]> {
    return new Paginator(this.http, '/api/v1/scheduled_statuses', params);
  }

  /**
   * View a single scheduled status
   * @param id ID of the scheduled status in the database.
   * @return ScheduledStatus
   * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
   */
  @version({ since: '2.7.0' })
  fetch(id: string): Promise<ScheduledStatus> {
    return this.http.get(`/api/v1/scheduled_statuses/${id}`);
  }

  /**
   * Update Scheduled status
   * @param id ID of the Status to be scheduled
   * @param params Parameters
   * @return ScheduledStatus
   * @see https://docs.joinmastodon.org/api/rest/scheduled-statuses/#put-api-v1-scheduled-statuses-id
   */
  @version({ since: '2.7.0' })
  update(
    id: string,
    params: UpdateScheduledStatusParams,
  ): Promise<ScheduledStatus> {
    return this.http.put(`/api/v1/scheduled_statuses/${id}`, params);
  }

  /**
   * Cancel a scheduled status
   * @param id ID of the scheduled status in the database.
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
   */
  @version({ since: '2.7.0' })
  remove(id: string): Promise<void> {
    return this.http.delete(`/api/v1/scheduled_statuses/${id}`);
  }
}

import { version } from '../decorators/index.ts';
import { Announcement, Reaction } from '../entities/index.ts';
import { Http } from '../http/index.ts';
import { Repository } from '../repository.ts';

export class AnnouncementRepository implements Repository<Announcement> {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Fetch announcements
   * @return Announcements
   */
  @version({ since: '3.1.0' })
  fetchAll() {
    return this.http.get<Announcement[]>('/api/v1/announcements');
  }

  /**
   * Dismiss announcement
   * @param id ID of the announcement
   * @return Nothing
   */
  @version({ since: '3.1.0' })
  dismiss(id: string) {
    return this.http.post<void>(`/api/v1/announcements/${id}/dismiss`);
  }

  /**
   * Add a reaction to an announcement
   * @param id ID of the announcement
   * @param name Emoji string
   * @return Announcement
   */
  @version({ since: '3.1.0' })
  addReaction(id: string, name: string) {
    return this.http.put<Reaction>(
      `/api/v1/announcements/${id}/reactions/${name}`,
    );
  }

  /**
   * Remove a reaction from an announcement
   * @param id ID of the announcement
   * @param name Emoji string
   * @return Announcement
   */
  @version({ since: '3.1.0' })
  removeReaction(id: string, name: string) {
    return this.http.delete<Reaction>(
      `/api/v1/announcements/${id}/reactions/${name}`,
    );
  }
}

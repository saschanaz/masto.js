import { Status as StatusProps } from '../entities';
import { StatusRepository } from '../repositories';

export class Status {
  constructor(
    private _props: StatusProps,
    private readonly _statusRepository: StatusRepository,
  ) {}

  get id(): string {
    return this.id;
  }

  get uri(): string {
    return this.uri;
  }

  get createdAt(): Date {
    return new Date(this.createdAt);
  }

  async reblog() {
    this._props = await this._statusRepository.reblog(this._props.id);
    return this;
  }
}

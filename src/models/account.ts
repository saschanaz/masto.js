import { asyncMap } from 'iter-tools';

import { Account as AccountProps } from '../entities';
import { AccountRepository } from '../repositories';

export class Account {
  constructor(
    private _props: AccountProps,
    private readonly _accountRepository: AccountRepository,
  ) {}

  get id(): string {
    return this._props.id;
  }

  get username(): string {
    return this._props.username;
  }

  get followers(): AsyncIterableIterator<Account[]> {
    return asyncMap(
      (accounts) =>
        accounts.map(
          (account) => new Account(account, this._accountRepository),
        ),
      this._accountRepository.getFollowersIterable(this._props.id),
    );
  }
}

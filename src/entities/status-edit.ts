import { Status } from './status.ts';

export type StatusEdit = Pick<
  Status,
  | 'content'
  | 'spoilerText'
  | 'sensitive'
  | 'createdAt'
  | 'account'
  | 'mediaAttachments'
  | 'emojis'
>;

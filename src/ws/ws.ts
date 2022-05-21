import EventEmitter from 'https://deno.land/x/eventemitter@1.2.4/mod.ts';

import { Conversation, Notification, Status } from '../entities/index.ts';

/** Map of event name and callback argument */
export interface EventTypeMap {
  /** Status posted */
  update: (status: Status) => void;
  /** Status deleted */
  delete: (id: Status['id']) => void;
  /** User's notification */
  notification: (notification: Notification) => void;
  /** User's filter changed */
  filters_changed: () => void;
  /** Status added to a conversation */
  conversation: (conversation: Conversation) => void;
  /** Status updated */
  'status.update': (status: Status) => void;
  /** for RxJS' `fromEvent` compatibility */
  [K: string]: any;
}

/** Supported event names */
export type EventType = keyof EventTypeMap;

/** Mastodon event */
export interface Event {
  event: EventType;
  payload: string;
}

export interface WsEvents extends Omit<EventEmitter<EventTypeMap>, 'on'> {
  // readonly connect: () => Promise<WsEvents>;
  readonly disconnect: () => void;
  readonly on: <T extends EventType>(
    name: T,
    cb: (...data: EventTypeMap[T]) => void,
  ) => void;
}

export interface Ws {
  stream(path: string, params: unknown): Promise<WsEvents>;
}

import EventEmitter from 'https://deno.land/x/eventemitter@1.2.4/mod.ts';

import { EventTypeMap, Ws, WsEvents } from './ws.ts';

export const wsDisconnect = jest.fn();
export const wsOn = jest.fn();
export const wsStream = jest.fn();

export class WsEventsMockImpl
  extends EventEmitter<EventTypeMap>
  implements WsEvents
{
  static connect = jest.fn();
  disconnect = wsDisconnect;
  on = wsOn;
}

export class WsMockImpl implements Ws {
  stream = wsStream;
}

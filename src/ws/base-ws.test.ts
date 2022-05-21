import { assertEquals } from 'https://deno.land/std@0.140.0/testing/asserts.ts';
import { describe, it } from 'https://deno.land/std@0.140.0/testing/bdd.ts';

import { SerializerNativeImpl } from '../serializers/index.ts';
import { BaseWs } from './base-ws.ts';

class Test extends BaseWs {
  baseUrl = 'wss://mastodon.social';
  config = {
    url: 'https://mastodon.social',
    accessToken: 'token',
  };
  serializer = new SerializerNativeImpl();
  version = '99.99.9';
  stream = (() => {}) as any;
}

describe('BaseWs', () => {
  it('resolves url', () => {
    const test = new Test();
    assertEquals(
      test.resolveUrl('/api/v1/streaming/public'),
      'wss://mastodon.social/api/v1/streaming/public',
    );
  });

  it('resolves url with params', () => {
    const test = new Test();
    assertEquals(
      test.resolveUrl('/api/v1/streaming/public', { public: true }),
      'wss://mastodon.social/api/v1/streaming/public?public=true',
    );
  });

  it('resolves protocols', () => {
    const test = new Test();
    assertEquals(test.createProtocols(), ['token']);
  });
});

import { SerializerNativeImpl } from '../serializers/index.ts';
import { BaseHttp } from './base-http.ts';
import { assertEquals } from 'https://deno.land/std@0.140.0/testing/asserts.ts';
import { describe, it } from 'https://deno.land/std@0.140.0/testing/bdd.ts';

class Test extends BaseHttp {
  config = {
    url: 'https://mastodon.social',
    accessToken: 'token',
  };
  request = (() => {}) as any;
  serializer = new SerializerNativeImpl();
}

describe('BaseHttp', () => {
  it('creates header', () => {
    const test = new Test();
    assertEquals(test.createHeader({ extra: 'header' }), {
      Authorization: 'Bearer token',
      'Content-Type': 'application/json',
      extra: 'header',
    });
  });

  it('override content-type header', () => {
    const test = new Test();
    assertEquals(test.createHeader({ 'Content-Type': 'multipart/form-data' }), {
      Authorization: 'Bearer token',
      'Content-Type': 'multipart/form-data',
    });
  });

  it('resolves url', () => {
    const test = new Test();
    assertEquals(
      test.resolveUrl('/api/v1/yay'),
      'https://mastodon.social/api/v1/yay',
    );
  });

  it('resolves url with params', () => {
    const test = new Test();
    assertEquals(
      test.resolveUrl('/api/v1/yay', { query: true }),
      'https://mastodon.social/api/v1/yay?query=true',
    );
  });
});

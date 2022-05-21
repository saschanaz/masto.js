import { SerializerNodejsImpl } from '../serializers/index.ts';
import { BaseHttp } from './base-http.ts';

class Test extends BaseHttp {
  config = {
    url: 'https://mastodon.social',
    accessToken: 'token',
  };
  request = jest.fn();
  serializer = new SerializerNodejsImpl();
}

describe('BaseHttp', () => {
  it('creates header', () => {
    const test = new Test();
    expect(test.createHeader({ extra: 'header' })).toEqual({
      Authorization: 'Bearer token',
      'Content-Type': 'application/json',
      extra: 'header',
    });
  });

  it('override content-type header', () => {
    const test = new Test();
    expect(
      test.createHeader({ 'Content-Type': 'multipart/form-data' }),
    ).toEqual({
      Authorization: 'Bearer token',
      'Content-Type': 'multipart/form-data',
    });
  });

  it('resolves url', () => {
    const test = new Test();
    expect(test.resolveUrl('/api/v1/yay')).toEqual(
      'https://mastodon.social/api/v1/yay',
    );
  });

  it('resolves url with params', () => {
    const test = new Test();
    expect(test.resolveUrl('/api/v1/yay', { query: true })).toEqual(
      'https://mastodon.social/api/v1/yay?query=true',
    );
  });
});

import {
  assert,
  assertEquals,
} from 'https://deno.land/std@0.140.0/testing/asserts.ts';
import {
  describe,
  it,
  beforeEach,
} from 'https://deno.land/std@0.140.0/testing/bdd.ts';

import {
  httpDelete,
  httpGet,
  HttpMockImpl,
  httpPost,
} from '../../http/http-mock-impl.ts';
import { StatusRepository } from '../status-repository.ts';

describe('status', () => {
  const mockHttp = new HttpMockImpl();
  const status = new StatusRepository(mockHttp, '999.0.0');

  beforeEach(() => {
    mockHttp.clear();
  });

  it('fetch', async () => {
    await status.fetch('123123');
    assertEquals(httpGet.calls[0].args[0], '/api/v1/statuses/123123');
  });

  it('create', async () => {
    await status.create({
      status: 'hello',
    });
    assertEquals(httpPost.calls[0].args[0], '/api/v1/statuses');
    assertEquals(httpPost.calls[0].args[1], {
      status: 'hello',
    });
  });

  it('type checks', () => {
    // @ts-expect-error: Poll cannot be combined with media
    status.create({
      mediaIds: ['123', '456'],
      poll: {
        options: ['Apple', 'Banana'],
        expiresIn: 10,
      },
    });

    // Status can be null when mediaIds provided
    status.create({
      mediaIds: ['123123'],
    });

    // @ts-expect-error: Status cannot be null when mediaIds are not provided
    status.create({
      status: null,
    });

    assert(true);
  });

  it('delete', async () => {
    await status.remove('123123');
    assertEquals(httpDelete.calls[0].args[0], '/api/v1/statuses/123123');
  });
});

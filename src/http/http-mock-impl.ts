import { spy } from 'https://deno.land/std@0.140.0/testing/mock.ts';

import { Http } from './http.ts';

export const httpRequest = spy();
export const httpGet = spy();
export const httpPost = spy();
export const httpPatch = spy();
export const httpPut = spy();
export const httpDelete = spy();

export class HttpMockImpl implements Http {
  clear() {
    httpRequest.calls.length = 0;
    httpGet.calls.length = 0;
    httpPost.calls.length = 0;
    httpPatch.calls.length = 0;
    httpPut.calls.length = 0;
    httpDelete.calls.length = 0;
  }

  request = httpRequest as any;
  get = httpGet as any;
  post = httpPost as any;
  patch = httpPatch as any;
  put = httpPut as any;
  delete = httpDelete as any;
}

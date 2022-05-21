import { assertEquals } from 'https://deno.land/std@0.140.0/testing/asserts.ts';
import { describe, it } from 'https://deno.land/std@0.140.0/testing/bdd.ts';

import { HttpMockImpl, httpPost } from '../../http/http-mock-impl.ts';
import { EmailRepository } from '../email-repository.ts';

describe('email', () => {
  const mockHttp = new HttpMockImpl();
  const email = new EmailRepository(mockHttp, '999.0.0');

  it('create confirmations', () => {
    email.createConfirmation({ email: 'foo@example.com' });
    assertEquals(httpPost.calls[0].args[0], '/api/v1/email/confirmations');
    assertEquals(httpPost.calls[0].args[1], {
      email: 'foo@example.com',
    });
  });
});

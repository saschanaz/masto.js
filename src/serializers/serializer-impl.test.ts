import { assertEquals } from 'https://deno.land/std@0.140.0/testing/asserts.ts';
import { describe, it } from 'https://deno.land/std@0.140.0/testing/bdd.ts';

import { camelCase } from 'https://deno.land/x/case@2.1.1/mod.ts';

import { transformKeys } from './transform-keys.ts';

describe('transformKeys', () => {
  it('transforms a flat object', () => {
    assertEquals(
      transformKeys(
        {
          key: 'value',
          key_key: ['value', 'value'],
          key_key_key: 3,
        },
        camelCase,
      ),
      {
        key: 'value',
        keyKey: ['value', 'value'],
        keyKeyKey: 3,
      },
    );
  });

  it('transforms a deep object', () => {
    assertEquals(
      transformKeys(
        {
          key: {
            key_key: {
              key_key_key: 'value',
            },
          },
        },
        camelCase,
      ),
      {
        key: { keyKey: { keyKeyKey: 'value' } },
      },
    );
  });

  it('transforms a deep object inside an array', () => {
    assertEquals(transformKeys([{ key_one: 'value' }], camelCase), [
      {
        keyOne: 'value',
      },
    ]);
  });

  it('transforms a array inside an object', () => {
    assertEquals(
      transformKeys(
        {
          key_one: [
            {
              value_one: 'value',
            },
          ],
        },
        camelCase,
      ),
      {
        keyOne: [{ valueOne: 'value' }],
      },
    );
  });
});

import { camelCase, snakeCase } from 'https://deno.land/x/case/mod.ts';

import { flattenObject } from './form-data.ts';
import { MimeType, Serializer } from './serializer.ts';
import { transformKeys } from './transform-keys.ts';

export class SerializerNativeImpl implements Serializer {
  serialize(type: MimeType, rawData: unknown): unknown {
    if (rawData == null) return;

    const data = transformKeys(rawData, snakeCase);

    // prettier-ignore
    switch (type) {
      case 'application/json':
        return JSON.stringify(data);
      case 'multipart/form-data': {
        const formData = new FormData();
        Object
          .entries(flattenObject(data))
          .forEach(([key, value]) => formData.append(key, value as string));
        return formData;
      }
      case 'application/x-www-form-urlencoded':
        return new URLSearchParams(Object.entries(data as Record<string, string>)).toString();
      default:
        return;
    }
  }

  deserialize<T = Record<string, unknown>>(type: MimeType, data: string): T {
    switch (type) {
      case 'application/json':
      case 'application/json; charset=utf-8':
        try {
          return transformKeys(JSON.parse(data), camelCase);
        } catch {
          return undefined as unknown as T;
        }
      default:
        throw new Error(`Unknown content type ${type}, ${data}`);
    }
  }
}

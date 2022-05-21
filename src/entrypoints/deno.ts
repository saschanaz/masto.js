import { MastoClient } from '../clients/index.ts';
import { MastoConfig } from '../config.ts';
import { HttpNativeImpl } from '../http/http-native-impl.ts';
import { InstanceRepository } from '../repositories/index.ts';
import { SerializerNativeImpl } from '../serializers/serializer-native-impl.ts';
import { WsNativeImpl } from '../ws/ws-native-impl.ts';

export const login = async (config: MastoConfig): Promise<MastoClient> => {
  const serializer = new SerializerNativeImpl();
  const http = new HttpNativeImpl(config, serializer);
  const instance = await new InstanceRepository(http, '1.0.0').fetch();
  const ws = new WsNativeImpl(
    instance.urls.streamingApi,
    instance.version,
    config,
    serializer,
  );

  return new MastoClient(http, ws, instance.version, config);
};

export * from '../decorators/index.ts';
export * from '../entities/index.ts';
export * from '../errors/index.ts';
// export * from '../http/index.ts';
export * from '../repositories/index.ts';
// export * from '../serializers/index.ts';
// export * from '../ws/index.ts';
export * from '../clients/index.ts';
export * from '../config.ts';
export * from '../paginator.ts';
export * from '../repository.ts';

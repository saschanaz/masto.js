import { MastoTimeoutError } from '../errors/index.ts';

export const timeout = <T>(task: Promise<T>, ms?: number): Promise<T> => {
  // It actually is depending on the runtime...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cancellationToken: number | undefined;

  if (ms == null) {
    return task;
  }

  const timeoutPromise = new Promise<never>((_, reject) => {
    cancellationToken = setTimeout(
      () => void reject(new MastoTimeoutError(`Timeout of ${ms}ms exceeded`)),
      ms,
    ) as unknown as number;
  });

  const mainPromise = task.then((value) => {
    clearTimeout(cancellationToken);
    return value;
  });

  return Promise.race([timeoutPromise, mainPromise]);
};

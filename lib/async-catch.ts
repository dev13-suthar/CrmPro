/* eslint-disable @typescript-eslint/no-explicit-any */
import { standardizeApiError } from './error';

type withServerActionAsyncCatcherType<T, R> = (args?: T) => Promise<R>;

function TypeSafeAction<T, R>(
  serverAction: withServerActionAsyncCatcherType<T, R>
): withServerActionAsyncCatcherType<T, R> {
  return async (args?: T): Promise<R> => {
    try {
      return await serverAction(args);
    } catch (error) {
      return standardizeApiError(error) as R;
    }
  };
}

export { TypeSafeAction };


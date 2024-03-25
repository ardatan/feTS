import { isPromise } from '@whatwg-node/server';

export function asyncIterationUntilReturn<TInput, TOutput>(
  iterable: Iterable<TInput>,
  callback: (result: TInput) => Promise<TOutput | undefined> | TOutput | undefined,
): Promise<TOutput | undefined> | TOutput | undefined {
  const iterator = iterable[Symbol.iterator]();
  function iterate(): Promise<TOutput | undefined> | TOutput | undefined {
    const { value, done } = iterator.next();
    if (done) {
      return;
    }
    if (value) {
      const callbackResult$ = callback(value);
      if (isPromise(callbackResult$)) {
        return callbackResult$.then(callbackResult => {
          if (callbackResult) {
            return callbackResult;
          }
          return iterate();
        });
      }
      if (callbackResult$) {
        return callbackResult$;
      }
      return iterate();
    }
  }
  return iterate();
}

export function isBlob(value: any): value is Blob {
  return value.arrayBuffer !== undefined;
}

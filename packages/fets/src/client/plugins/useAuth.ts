import { ClientPlugin } from '../types';
import { ClientOnRequestInitPayload } from './../types';

export function useOAuth(token: string): ClientPlugin {
  return {
    onRequestInit({ requestInit }: ClientOnRequestInitPayload): void {
      requestInit.headers = {
        ...requestInit.headers,
        Authorization: `Bearer ${token}`,
      };
    },
  };
}

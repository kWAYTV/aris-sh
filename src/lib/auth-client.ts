import {
  magicLinkClient,
  twoFactorClient,
  usernameClient
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { getBaseUrl } from '@/lib/utils';

const CONFIG = {
  baseURL: getBaseUrl(),

  plugins: [
    magicLinkClient(),
    usernameClient(),

    twoFactorClient({
      onTwoFactorRedirect: () => {
        window.location.href = '/auth/two-factor';
      }
    })
  ]
};

export const authClient = createAuthClient(CONFIG);

export const { signOut, useSession } = authClient;

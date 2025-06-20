import { createAuthClient } from 'better-auth/react';

import { getBaseUrl } from '@/lib/utils';

const CONFIG = {
  baseURL: getBaseUrl()
};

export const authClient = createAuthClient(CONFIG);

export const { signOut, useSession } = authClient;

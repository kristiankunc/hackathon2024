import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from '$lib/auth';
import type { Handle } from '@sveltejs/kit';
import { log } from 'console';

const setLocals: Handle = async ({ event, resolve }) => {
  const authSession = await event.locals.auth();
  log(event.url.href);

  if (
    !authSession &&
    event.url.href != 'http://localhost:5173/landing' &&
    event.url.href != 'http://localhost:5173/auth/signin'
  ) {
    return new Response(null, {
      status: 302,
      headers: {
        // Location: '/auth/signin'
        Location: '/landing'
      }
    });
  }

  if (authSession?.user?.name && authSession?.user?.email && authSession?.user?.image) {
    event.locals.user = {
      name: authSession.user.name,
      email: authSession.user.email,
      image: authSession.user.image
    };
  }

  return resolve(event);
};

export const handle = sequence(authHandle, setLocals);

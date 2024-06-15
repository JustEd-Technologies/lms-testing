import { writable } from 'svelte/store';
import { LOCALE } from '$lib/types';

interface ProfileStore {
  id: string | undefined;
  fullname: string;
  avatar_url: string;
  profile_url?: string;
  username: string;
  user_id: string;
  email: string;
  role: string;
  goal: string;
  source: string;
  telegram_chat_id: number | null;
  locale: LOCALE;
  is_email_verified: boolean;
  verified_at: string;
}

export const defaultProfileState: ProfileStore = {
  id: undefined,
  fullname: '',
  avatar_url:
    'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png',
  username: 'User',
  user_id: '',
  email: '',
  role: '',
  goal: '',
  source: '',
  telegram_chat_id: null,
  locale: LOCALE.EN,
  is_email_verified: false,
  verified_at: '',
};

export const profile = writable<ProfileStore>(defaultProfileState);

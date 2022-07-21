import { get } from '@/utils/fetch';

export const fetchMenuData = params =>
  get('', params);

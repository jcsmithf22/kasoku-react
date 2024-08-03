import { POCKETBASE_URL } from '@/lib/constants';
import { TypedPocketBase } from '@/lib/pocketbase-types';
import Pocketbase from 'pocketbase'

export const pb = new Pocketbase(POCKETBASE_URL) as TypedPocketBase;
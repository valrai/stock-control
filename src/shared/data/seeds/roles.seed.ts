import { claimsSeed } from './claims.seed';
import { Role } from '../../auth/models/role/role.entity';

export const rolesSeed: Role[] = [
  {
    id: 1,
    claims: claimsSeed,
    name: 'administrador',
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    claims: [],
    name: 'vendedor',
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

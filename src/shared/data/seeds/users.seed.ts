import { User } from '../../users/models/user.entity';
import { rolesSeed } from './roles.seed';

export const usersSeed: User[] = [
  {
    id: 1,
    username: 'adm',
    email: 'admin@email.com',
    password: '$2b$10$HI1KRrQPmA1T92md7/B0AOhJquHy8yFmcu97AkPZv49eyRzlVznyG', // 123456
    roles: [rolesSeed[0]],
    salt: '$2b$10$HI1KRrQPmA1T92md7/B0AO',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    checkPassword: null,
  },
  {
    id: 2,
    username: 'usuario_teste',
    email: 'usuario.teste@email.com',
    password: '$2b$10$HI1KRrQPmA1T92md7/B0AOhJquHy8yFmcu97AkPZv49eyRzlVznyG', // 123456
    roles: [rolesSeed[1]],
    salt: '$2b$10$HI1KRrQPmA1T92md7/B0AO',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    checkPassword: null,
  },
];

import { Role } from '@common/enums/role.enum';
import { User } from '@/modules/users/entities/users.entity';

export const mockUserData: User = {
  id: 1,
  password: '777777777',
  email: 'test@gmail.com',
  firstName: 'Stella',
  lastName: 'Yan',
  role: Role.USER,
} as User;
export const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjo1LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk3MTM4MDcsImV4cCI6MTY5OTgwMDIwN30.okz9JoonQYeSha82udjAv0vVF_07PSOxJn1UHyq8g1E';
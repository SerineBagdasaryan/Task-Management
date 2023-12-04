import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/modules/users/entities/users.entity';
import { accessToken, mockUserData } from '@common/mocks/mock-data';
import { classToPlain } from 'class-transformer';
type UserWithoutId = Pick<User, Exclude<keyof User, 'id'>>;

describe('AuthService', () => {
  let authService: AuthService;
  let usersServiceMock: UsersService;
  const user: User = mockUserData as User;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getUserByEmail: jest.fn(),
            createOrUpdateToken: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersServiceMock = module.get<UsersService>(UsersService);
  });

  it('should sign up a user and return the user', async () => {
    const newUser: UserWithoutId = user;
    jest.spyOn(usersServiceMock, 'getUserByEmail').mockResolvedValue(undefined);
    jest
      .spyOn(usersServiceMock, 'createUser')
      .mockResolvedValue(newUser as User);

    const response = await authService.registration(user);
    const expectedResult = classToPlain(user) as User;

    expect(response).toEqual(expectedResult);
  });

  it('should login and return a TokenResponseDto on successful login', async () => {
    let userDto: Pick<User, 'email' | 'password'> = { ...user };

    jest.spyOn(usersServiceMock, 'getUserByEmail').mockResolvedValue(user);
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    jest.spyOn(authService, 'generateToken').mockResolvedValue(accessToken);

    const result = await authService.login(userDto);

    expect(result.accessToken).toEqual(accessToken);
  });
});

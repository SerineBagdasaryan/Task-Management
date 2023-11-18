import {AuthService} from "@/modules/auth/auth.service";
import {UsersService} from "@/modules/users/users.service";
import {Test, TestingModule} from "@nestjs/testing";
import {JwtService} from "@nestjs/jwt";
import {User} from "@/modules/users/entities/users.entity";
import {accessToken, mockUserData} from "@/common/mock-data";

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
            validateCredentials: jest.fn(),
            createUser: jest.fn(),
            getUserByEmail: jest.fn(),
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
    delete user.id;
    jest.spyOn(usersServiceMock, 'getUserByEmail').mockResolvedValue(undefined);
    jest.spyOn(usersServiceMock, 'createUser').mockResolvedValue(user);

    const response = await authService.registration(user);

    expect(response).toEqual({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    expect(response.password).toBeUndefined();
  });

  it('should login and return a TokenResponseDto on successful login', async () => {
    let userDto: Pick<User, 'email' | 'password'> = {...user};

    jest.spyOn(usersServiceMock, 'getUserByEmail').mockResolvedValue(user);
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    jest.spyOn(authService, 'generateToken').mockResolvedValue({
      accessToken: accessToken,
      id: user.id,
    });

    const result = await authService.login(userDto);

    expect(result.accessToken).toEqual(accessToken);
    expect(result.id).toEqual(user.id);
  });

});


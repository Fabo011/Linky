import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
            verify: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('create', () => {
    it('should hash the password and save the user', async () => {
      const user = new User();
      user.username = 'testuser';
      user.password = 'testpassword';

      const save = jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      const result = await authService.create(user);

      expect(save).toHaveBeenCalledWith(user);
      expect(result).toBe(user);
      expect(user.password).not.toBe('test-password');
    });

    it('should throw an error if the username is not in the correct format', async () => {
      const user = new User();
      user.username = 'test user';
      user.password = 'test-password';

      await expect(authService.create(user)).rejects.toThrowError('Username has not the correct format');
    });
  });

  describe('getAuthToken', () => {
    it('should return a token', async () => {
      const result = await authService.getAuthToken('testuser');
      expect(result).toBe('mock-token');
      expect(jwtService.sign).toHaveBeenCalledWith({ username: 'testuser' });
    });
  });

});
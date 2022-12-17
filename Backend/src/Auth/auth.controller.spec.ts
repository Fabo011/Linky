/*import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('ProfileController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    //expect(controller).toBeDefined();
  });
});*/
//it('should be defined', () => {
  //expect(controller).toBeDefined();
//});

import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should return a token', async () => {
      const authCredentials = { username: 'testuser', password: '32238dvdsvcsc' };
      const user = new User();
      user.username = 'testuser';
      user.password = '32238dvdsvcsc'
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      jest.spyOn(authService, 'create').mockResolvedValue(null);
      jest.spyOn(authService, 'getAuthToken').mockResolvedValue('mock-token');

      await authController.signup(authCredentials, user, res);

      expect(authService.create).toHaveBeenCalledWith(user);
      expect(authService.getAuthToken).toHaveBeenCalledWith('test-user');
      expect(res.send).toHaveBeenCalledWith('mock-token');
    });

    it('should return a 500 status code and a message if there is an error', async () => {
      const authCredentials = { username: 'testuser', password: '32238dvdsvcsc' };
      const user = new User();
      user.username = 'testuser'
      user.password = '32238dvdsvcsc'
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest.spyOn(authService, 'create').mockRejectedValue(new Error('mock error'));

      await authController.signup(authCredentials, user, res);

      expect(authService.create).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Invalid username or password');
    });
  });

})
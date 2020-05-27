import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '1234455',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Teste2',
      email: 'teste2@teste.com',
    });

    expect(updatedUser.name).toBe('Teste2');
    expect(updatedUser.email).toBe('teste2@teste.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'user.id',
        email: 'Teste@test.com',
        name: 'Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '1234455',
    });

    const user = await fakeUsersRepository.create({
      email: 'teste2@teste.com',
      name: 'Teste2',
      password: '1234455',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Teste',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '1234455',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Teste2',
      email: 'teste2@teste.com',
      old_password: '1234455',
      password: 'abcdef',
    });

    expect(updatedUser.password).toBe('abcdef');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '1234455',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Teste2',
        email: 'teste2@teste.com',
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '1234455',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Teste2',
        email: 'teste2@teste.com',
        old_password: '12344',
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import { injectable, inject } from 'tsyringe';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';

import IUsersRepository from '../../users/repositories/IUsersRepository';
// import AppError from '../../../shared/errors/AppError';
import User from '../../users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllproviders({
        except_user_id: user_id,
      });

      console.log('Salvo no redis');

      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProviderService;

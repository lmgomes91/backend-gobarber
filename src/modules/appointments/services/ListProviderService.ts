import { injectable, inject } from 'tsyringe';

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
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllproviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;

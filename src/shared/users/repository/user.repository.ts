import { CredentialsDto } from '../../auth/dtos/credentials/credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { password, username } = credentialsDto;
    const user = await this.findOne({
      where: { username: username },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}

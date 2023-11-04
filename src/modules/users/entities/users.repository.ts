import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';


export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({ email });
    }

}
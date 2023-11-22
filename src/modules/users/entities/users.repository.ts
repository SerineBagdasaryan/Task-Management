import { InjectRepository } from '@nestjs/typeorm';
import {Repository, UpdateResult} from 'typeorm';
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

    async updatePassword(id: number, newPassword: string): Promise<UpdateResult> {
        return await this.createQueryBuilder()
            .update(User)
            .set({ password: newPassword })
            .where('id = :id', { id })
            .execute();
    }

}
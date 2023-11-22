import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersToken} from "@/modules/users/entities/users-token.entity";


export class UsersTokenRepository extends Repository<UsersToken> {
    constructor(
        @InjectRepository(UsersToken)
            _usersTokenRepository: Repository<UsersToken>
    ) {
        super(_usersTokenRepository.target, _usersTokenRepository.manager, _usersTokenRepository.queryRunner);
    }



}
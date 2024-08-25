import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private accountService: AccountService,
  ) {}

  findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email } });
  }

  createUser(email: string, hash: string, salt: string) {
    return this.db.user.create({ data: { email, hash, salt } });
  }

  async create(email: string, hash: string, salt: string) {
    const user = await this.db.user.create({ data: { email, hash, salt } });
    await this.accountService.create(user.id);

    return;
  }
}

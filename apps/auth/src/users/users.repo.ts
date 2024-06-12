import { AbstractRepo } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepo extends AbstractRepo<UserDocument> {
  protected readonly logger = new Logger(UsersRepo.name);

  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepo } from './reservations.repo';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepo: ReservationsRepo) {}

  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationsRepo.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  findAll() {
    return this.reservationsRepo.find({});
  }

  findOne(id: string) {
    return this.reservationsRepo.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepo.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return this.reservationsRepo.findOneAndDelete({ _id: id });
  }
}

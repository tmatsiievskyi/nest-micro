import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepo } from './reservations.repo';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepo],
})
export class ReservationsModule {}

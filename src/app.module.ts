import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { ColyseusModule } from './colyseus.module';


@Module({
  imports: [PlayerModule, ColyseusModule],
})
export class AppModule { }

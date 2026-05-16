import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server, defineServer, defineRoom, matchMaker } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { GameRoom } from './player/game-room';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });


  await app.init();

  const httpServer = app.getHttpServer();
  const gameServer = new Server({
    transport: new WebSocketTransport({
      server: httpServer,
    }),
  });

  gameServer.define("game", GameRoom)

  gameServer.listen(2567)

  console.log('🚀 Server running at http://localhost:2567');
}

bootstrap();
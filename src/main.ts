import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'colyseus';
import { createServer } from 'http';
import { WebSocketTransport } from '@colyseus/ws-transport';

import { GameRoom } from './player/game-room';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();
  app.enableCors({
    origin: "http://localhost:5173", // Izinkan origin dari Vite kamu
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  const httpServer = createServer(
    app.getHttpAdapter().getInstance(),
  );

  const gameServer = new Server({
    transport: new WebSocketTransport({
      server: httpServer,
    }),
  });

  gameServer.define('my_room', GameRoom);

  httpServer.listen(2567);

  console.log('Game Server is running on ws://localhost:2567');
}

bootstrap();
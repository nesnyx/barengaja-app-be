import { Module, OnModuleInit, Global } from '@nestjs/common';
import { Server } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { createServer } from 'http';
import { GameRoom } from './player/game-room';


@Global()
@Module({})
export class ColyseusModule implements OnModuleInit {
    private gameServer: Server;

    onModuleInit() {
        // Note: In NestJS, you often want to attach to the existing HTTP server
        this.gameServer = new Server({
            transport: new WebSocketTransport()
        });

        this.gameServer.define('my_room', GameRoom);
    }

    // Optional: Provide a way to access the server instance if needed
    getGameServer() {
        return this.gameServer;
    }
}
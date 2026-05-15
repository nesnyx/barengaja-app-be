import { Room, Client } from "colyseus";
import { MyRoomState, PlayerState } from "./schemas/player.schema";

export class GameRoom extends Room<MyRoomState | any> {
    maxClients = 20;

    onCreate(options: any) {
        this.setState(new MyRoomState());
        // Menangani pesan "move" dari Phaser
        this.onMessage("move", (client, data) => {
            const player = this.state.players.get(client.sessionId);
            if (!player) return;

            const speed = 5; // Samakan atau sesuaikan dengan speed di client

            if (data.left) player.x -= speed;
            if (data.right) player.x += speed;
            if (data.up) player.y -= speed;
            if (data.down) player.y += speed;
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "bergabung!");

        // Tambahkan player baru ke state
        const newPlayer = new PlayerState();
        newPlayer.x = Math.random() * 800;
        newPlayer.y = Math.random() * 600;

        this.state.players.set(client.sessionId, newPlayer);
    }

    onLeave(client: Client | any, consented: boolean | any) {
        console.log(client.sessionId, "keluar!");
        this.state.players.delete(client.sessionId);
    }
}
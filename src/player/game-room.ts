import { Room, Client } from "colyseus";
import { MyRoomState, PlayerState } from "./schemas/player.schema";

export class GameRoom extends Room {
    maxClients = 4;
    state = new MyRoomState()

    messages = {
        setPlayer: (client: Client, character: string) => {
            const player = this.state.players.get(client.sessionId)
            if (player) {
                player.character = character
            }
        }
    }

    onCreate(options: any) {
        console.log("GameRoom created!");
    }


    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "bergabung!");
        const newPlayer = new PlayerState();
        newPlayer.sessionId = client.sessionId
        newPlayer.x = Math.random() * 800;
        newPlayer.y = Math.random() * 600;

        this.state.players.set(client.sessionId, newPlayer);

    }

    onLeave(client: Client | any, consented: boolean | any) {
        console.log(client.sessionId, "keluar!");
        this.state.players.delete(client.sessionId);
    }
}
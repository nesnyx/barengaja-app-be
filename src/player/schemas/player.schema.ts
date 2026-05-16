import { Schema, type, MapSchema } from "@colyseus/schema";

export class PlayerState extends Schema {
    @type("string") sessionId: string = "";
    @type("number") x: number = 400;
    @type("number") y: number = 300;
    @type("string") character: string = "Lubu";
}

export class MyRoomState extends Schema {
    @type({ map: PlayerState }) players = new MapSchema<PlayerState>();

}
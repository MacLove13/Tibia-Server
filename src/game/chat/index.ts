import * as SocketIO from 'socket.io';
import { serverSocket } from '@socket/socket';
import { Player, allPlayers } from "@game/player";
import * as Time from '@utils/time';
import { serverEvent } from '@events';
import { CommandRegistry } from './commandsSystem/CommandRegistry';
import * as Geometry from '@utils/geometry';

serverEvent.on('user:connect', OnConnection);

export function OnConnection(plr: Player, socket: SocketIO.Socket) {
  const playerLayer = plr.conversations;

  socket.on("chat:command:execute", function (data: { cmd: string; args: any; }) {
    console.log("User as used command: " + data.cmd)
    console.log("Args: " + data.args)

    const command = CommandRegistry.getCommand(data.cmd);
	  if (command) {
	  	if (command.async == false)
	  	  command.execute(plr, data.args);
	  	else
	  		command.executeAsync(plr, data.args);
	  } else {
	    console.log("Command not found.");
	  }
  });

  socket.on("chat:sendMessage", function (data: { chatId: number; message: string }) {

  	allPlayers.map(x => {
  		if (Geometry.GetDistance(plr.syncData.Position, x.syncData.Position) > 10) return;

	    x.socket.emit("chat:sendMessage", { id: 0, messages: [
				{
					id: data.chatId,
					sender: {
						id: plr.syncData.SqlID,
						name: plr.syncData.Name,
					},
					hour: Time.getHourAndMinute(),
					message: data.message
				}
			]})
		})
  });

  plr.socket.emit("chat:sendMessage", { id: 0, name: 'General', messages: [
		{
			id: 0,
			sender: {
				id: 0,
				name: 'System'
			},
			hour: Time.getHourAndMinute(),
			message: `Olá ${plr.syncData.Name}, bem vindo!`
		}
	]});

	plr.socket.emit("chat:sendMessage", { id: -1, name: 'System', messages: [
		{
			id: -1,
			sender: {
				id: 0,
				name: 'System'
			},
			hour: Time.getHourAndMinute(),
			message: 'Você entrou no jogo'
		}
	]});
}

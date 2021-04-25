import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

io.on('connect', (socket) => {
    socket.on('client_first_access', async params => {
        try {
            const { email, text } = params;

            const connectionsService = new ConnectionsService();
            const usersService = new UsersService();
            const messagesService = new MessagesService();

            const socket_id = socket.id;
            let user = await usersService.findByEmail(email);

            if (!user) {
                user = await usersService.create({ email });
            }

            const connection = await connectionsService.findByUserId(user.id);

            if (!connection) {
                await connectionsService.create({
                    user_id: user.id,
                    socket_id
                });
            } else {
                await connectionsService.updateSocketId({ id: connection.id, socket_id });
            }

            await messagesService.create({
                user_id: user.id,
                sender_id: user.id,
                text
            });
        } catch (err) {
            console.error(err);
        }
    })
})
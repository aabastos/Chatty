import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

io.on('connect', (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    socket.on('client_first_access', async params => {
        try {
            const { email, text } = params;


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

            const allMessages = await messagesService.showByUser(user.id);

            socket.emit('client_list_all_messages', allMessages);
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('client_send_to_admin', async params => {
        const { text, socket_admin_id } = params;

        const { user_id } = await connectionsService.findBySocketId(socket.id);

        const message = await messagesService.create({
            text,
            user_id,
            admin_id: socket_admin_id,
            sender_id: user_id
        });

        io.to(socket_admin_id).emit('admin_receive_message', {
            message,
            socket_id: socket.id
        })
    })
})
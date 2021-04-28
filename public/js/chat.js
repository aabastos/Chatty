let socket_admin_id = null;
let email_user = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
    socket = io();

    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none';

    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block';

    const email = document.getElementById('email').value;
    email_user = email;

    const text = document.getElementById('txt_help').value;

    socket.on('connect', () => {
        const params = {
            email,
            text
        };

        socket.emit('client_first_access', params, (call, err) => {
            if (err) {
                console.err(err);
            } else {
                console.log(call);
            }
        })
    });

    socket.on('client_list_all_messages', (messages) => {
        const template_client = document.getElementById('message-user-template').innerHTML;
        const template_admin = document.getElementById('admin-template').innerHTML;

        messages.forEach(message => {
            const { admin_id, user_id, sender_id } = message;

            if (sender_id === user_id) {
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email: message.user.email
                });

                document.getElementById('messages').innerHTML += rendered;
            } else if (sender_id === admin_id) {
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text
                });

                document.getElementById('messages').innerHTML += rendered;
            }
        });
    });

    socket.on('admin_send_to_client', message => {
        socket_admin_id = message.socket_id;

        const template_admin = document.getElementById('admin-template').innerHTML;
        const rendered = Mustache.render(template_admin, {
            message_admin: message.text
        });

        document.getElementById('messages').innerHTML += rendered;
    })
});

document.querySelector('#send_message_button').addEventListener('click', (event) => {
    const text = document.getElementById('message_user');

    const params = {
        text: text.value,
        socket_admin_id
    }

    socket.emit('client_send_to_admin', params);

    var template_client = document.getElementById('message-user-template').innerHTML;

    const rendered = Mustache.render(template_client, {
        message: text.value,
        email: email_user
    });

    document.getElementById('messages').innerHTML += rendered;
})
var config = function () {
    return {
        callback_fields: {
            leave: ['callback', 'error'],
            history: ['callback', 'error'],
            replay: ['callback'],
            publish: ['callback', 'error'],
            unsubscribe: ['callback', 'error'],
            subscribe: ['callback', 'message', 'connect', 'reconnect', 'disconnect', 'error', 'idle'],
            here_now: ['callback', 'error'],
            grant: ['callback', 'error'],
            revoke: ['callback', 'error'],
            audit: ['callback', 'error']
        },
        methods_with_callback_in_args: [
            'history', 'time', 'publish', 'unsubscribe', 'subscribe', 'here_now', 'grant',
            'audit', 'revoke', 'time'
        ],
        methods_to_delegate: ['history', 'replay', 'subscribe', 'publish', 'unsubscribe', 'here_now', 'grant', 'revoke',
            'audit', 'auth', 'time', 'set_uuid']
    };
};
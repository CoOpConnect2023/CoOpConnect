// pusher.js

import Pusher from 'pusher-js';
const appKey = import.meta.env.PUSHER_APP_KEY;
const cluster = 'us2';

const pusher = new Pusher(appKey, {
    cluster: cluster,
    encrypted: true,
});

export default pusher;

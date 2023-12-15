/**
 * Maybe no longer needed
 */

import swal from 'sweetalert2';
import { store } from '@/store/store';
import eventBus from '@/components/lib/event-bus';

export const showChatSecretPopup = async () => {
    const { value: userInput } = await swal.fire({
        title: 'Secret Key Required',
        input: 'text',
        inputLabel: 'Input secret key from your chat room.',
        showCancelButton: true,
    });

    if (userInput) {
        store.chatPublicKey = userInput;
        eventBus.emit('fetchChatMessages');
    } else {
        swal.fire('Cancelled', 'You did not enter anything. You cant chat with someone without encryption!', 'info');
    }
};

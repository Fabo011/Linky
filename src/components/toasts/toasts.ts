import swal from 'sweetalert2';
import router from '@/router/index';

export const signeduptoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `You´re successfully signed up. Check your emails within one minute, we´ve sent you an magic link to login.`,
            showConfirmButton: true,
        });
};

export const signedintoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `You´re successfully signed in. Check your emails within one minute, we´ve sent you an magic link to login.`,
            showConfirmButton: true,
        });
};

export const savedigitalkeytoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `You´ve copied your digital key. Please save him secure you will need them at the next login.`,
            showConfirmButton: true,
            confirmButtonText: 'Got to your cloud'
        }).then(() => {
           router.push('/profile');
        });
};

export const addedtoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `Successfully saved.`,
            timer: 1500,
            showConfirmButton: false,
        });
};

export const updatedtoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `Successfully updated.`,
            timer: 1500,
            showConfirmButton: false,
        });
};

export const deletedtoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `Successfully deleted.`,
            timer: 1500,
            showConfirmButton: false,
        });
};

export const copiedtoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `Successfully copied.`,
            timer: 1500,
            showConfirmButton: false,
        });
};

export const deletionUnsuccessfullToast = () => {
    swal
        .fire({
            icon: 'success',
            text: `Deletion unsuccessful.`,
            timer: 1500,
            showConfirmButton: false,
        });
};

export const deleteWarnToast = () => {
    swal
        .fire({
            icon: 'warning',
            text: `When you really want to delete this item, please click the delete button again.`,
            timer: 3500,
            showConfirmButton: false,
        });
}
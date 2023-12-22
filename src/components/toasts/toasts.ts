import swal from 'sweetalert2';
import router from '@/router/index';

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

export const errorToast = () => {
    swal
        .fire({
            icon: 'error',
            text: `Error. Just try again.`,
            showConfirmButton: true,
            confirmButtonText: 'Ok'
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
};

export const downloadtoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `Successfully downloaded.`,
            timer: 1500,
            showConfirmButton: false,
        });
};
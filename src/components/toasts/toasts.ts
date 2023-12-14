import swal from 'sweetalert2';

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

import swal from 'sweetalert2';

export const savedigitalkeytoast = () => {
    swal
        .fire({
            icon: 'success',
            text: `You´ve copied your digital key.`,
            timer: 1500,
        })
}

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

export const errorToastFileUpload = () => {
    swal
        .fire({
            icon: 'error',
            html: `
            File size exceeds the limit of 150MB.
            `,
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

export const deleteAccountConfirmToast = () => {
    return swal.fire({
        icon: 'warning',
        title: 'Delete Account',
        html: `
            <p>Are you sure you want to <strong>permanently delete</strong> your account and all associated data?</p>
            <p><b>This action cannot be undone.</b></p>
            <p>You can make a backup first by clicking the <strong>Export CSV</strong> button in the sidebar before deleting.</p>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Yes, delete my account',
        confirmButtonColor: '#d33',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
    });
};

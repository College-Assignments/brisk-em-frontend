export function errToast(toast: any) {
    toast({
        status: 'error',
        isClosable: true,
        position: 'bottom',
        title: 'Error Occured, Please Report to Admin',
    });
}

export function successToast(toast: any) {
    toast({
        status: 'success',
        isClosable: true,
        position: 'bottom',
        title: 'Success!',
    });
}

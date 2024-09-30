import { Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const MySwal = withReactContent(Swal)

export const SwalReact = MySwal.mixin({
    customClass: {
        confirmButton: 'btn-swa-confirm text-white text-bold ms-3',
        cancelButton: 'btn-swa-cancel text-black text-bold me-3'
    },
    buttonsStyling: false,
    allowEnterKey: false,
    allowOutsideClick: false,
    reverseButtons: true,
    heightAuto: false
})

export const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', SwalReact.stopTimer)
        toast.addEventListener('mouseleave', SwalReact.resumeTimer)
    }
})

export const ToastLoading = MySwal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
})

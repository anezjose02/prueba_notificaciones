import axios from "axios";
import { SwalReact } from "./SwalConfig";
import {capitalizeFirstLetter} from "./stringUtils";


/**
 * @param {function} onAccept - Callback function to execute on accept.
 *                              If this is defined, 'route' will be ignored.
 * @param {string} route - The route to navigate to upon accept.
 *                         This will be ignored if 'onAccept' is provided.
 */

const baseConfirmationAlert = ({
   title,
   message,
   confirmButtonText,
   route,
   onAccept,
}) => {
    try {
        SwalReact.fire({
            title: `<div class="text-teal text-left">${title}</div>`,
            html: `<div class="text-blue-medium text-left font-bold">${message}</div>`,
            showConfirmButton: true,
            confirmButtonText,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'custom-swal',
                popup: 'rounded-3',
                actions: 'swal2-actions w-100 justify-content-end'
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                if(onAccept) {
                    onAccept();
                } else {
                    axios.post(route)
                        .then(response => {
                            let icon = response.data.success ? 'success' : 'error';
                            SwalReact.fire({
                                icon: icon,
                                title: response.data.title,
                                text: response.data.message,
                                showConfirmButton: false,
                                timer: 2000,
                            }).then(() => {
                                location.reload();
                            })
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }
        })
    } catch (error) {
        SwalReact.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Error al '+text+': '+ error,
            showConfirmButton: false,
            timer: 2000,
        }).then(() => {
            window.location.replace('/admin/');
        })
    }
}

/**
 * @param {boolean} isActive
 *
 * @param {string} title - can include ":status" to dynamically insert the current state.
 *
 * @param {string} message - can include ":status" to dynamically insert the current state.
 *
 * @param {string} actionStateNames - custom status names
 *
 * @param {string} [actionStateNames.active]
 *
 * @param {string} [actionStateNames.inactive]
 *
 * @param {function} onAccept - Callback function to execute on accept.
 *                              If this is defined, 'route' will be ignored.
 * @param {string} route - The route to navigate to upon accept.
 *                         This will be ignored if 'onAccept' is provided.
 */

export const confirmToggleStatus = ({
    isActive,
    title,
    message,
    route,
    actionStateNames = { active: 'activar', inactive: 'desactivar' },
    onAccept
}) => {
    const action = !isActive ? actionStateNames.active : actionStateNames.inactive;

    const capitalizedTitle = capitalizeFirstLetter(title.replace(':status', action));
    const text = message.replace(':status', action);

    baseConfirmationAlert({
        title: capitalizedTitle,
        message: text,
        confirmButtonText: 'Aceptar',
        route,
        onAccept
    });
}

/**
 *
 * @param {string} title
 *
 * @param {string} message
 *
 * @param {function} onAccept - Callback function to execute on accept.
 *                              If this is defined, 'route' will be ignored.
 * @param {string} route - The route to navigate to upon accept.
 *                         This will be ignored if 'onAccept' is provided.
 */

export const alertConfirmation = ({
  title,
  message,
  route,
  onAccept
}) => {
    baseConfirmationAlert({
        title,
        message,
        confirmButtonText: 'Aceptar',
        route,
        onAccept
    });
}

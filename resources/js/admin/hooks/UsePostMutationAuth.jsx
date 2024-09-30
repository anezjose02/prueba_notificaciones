import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {SwalReact} from "../utils/SwalConfig";


export const usePostMutation = () => {
    const mutation = useMutation({
        mutationFn: ({url, data}) => {
            return axios.post(route(url), data);
        },
        onError: (error, data) => {
            let title = 'Error al iniciar sesión';
            let dataNumber = 0
            if (data.data.email === '' && data.data.password === '' ){
                title = 'Error: falta el correo y contraseña';
                dataNumber = 1;
            }
            if (data.data.email === '' && dataNumber === 0) {
                title = 'Error: falta el correo';
            } else if (data.data.password === '' && dataNumber === 0) {
                title = 'Error: falta la contraseña';
            }

            console.error('Error en la petición:', error);
            SwalReact.fire({
                icon: 'error',
                title: '',
                text:title
            });
        },
        onSuccess: (response) => {
            if(response.data.success){
                SwalReact.fire({
                    icon: 'success',
                    title: '¡Acceso concedido!',
                    text: 'Ha iniciado sesión con éxito',
                    showConfirmButton: false,
                    timer: 2000,
                    heightAuto: false
                }).then(() => {
                    window.location.replace('/admin/dashboard');
                })
            }else{
                SwalReact.fire({
                    icon: 'error',
                    //title: '¡Acceso denegado!',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2000,
                    heightAuto: false
                }).then(() => {
                })
            }
        },
    });

    return mutation;
}

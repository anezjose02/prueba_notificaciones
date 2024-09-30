import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {SwalReact} from "../utils/SwalConfig";

export const usePostMutationAdmin = (refetchCallback) => {
    const mutation = useMutation({
        mutationFn: ({url, params, data}) => {
            return axios.post(route(url, params), data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        onError: (error) => {
            SwalReact.fire({
                icon: 'error',
                title: 'Error al realizar la petición',
                text: error,
            })
        },
        onSuccess: (response) => {
            SwalReact.fire({
                icon: 'success',
                title: response.data.title,
                text: response.data.message,
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                if (typeof refetchCallback === 'function') {
                    refetchCallback();
                } else {
                    console.error("refetchCallback is not a function");
                }
            })
        },
    });
    return mutation;
}

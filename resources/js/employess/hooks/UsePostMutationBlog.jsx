import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from "react-router-dom";
import {SwalReact} from "../utils/SwalConfig";
import {useFetchQuery} from "./UseFetchQuery";


export const UsePostMutationBlog = () => {
    const navigate = useNavigate();
    const params = {};
    const blogQuery = useFetchQuery('blog.index_content', params, 'blog');
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
                navigate(`/admin/blog`)
                blogQuery.refetch();
            })
        },
    });

    return mutation;
}

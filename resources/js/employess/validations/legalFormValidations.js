import * as Yup from 'yup';

const isUpdate = false;
export const legalValidations = Yup.object({

    content: Yup.string().trim().required('El contenido es requerido'),
})

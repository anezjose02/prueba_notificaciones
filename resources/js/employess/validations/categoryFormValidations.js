import * as Yup from 'yup';

const isUpdate = false;

export const categoryValidations = Yup.object({

    name: Yup.string()
        .trim()
        .required('El titulo es requerido')
        //.matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-Z]+(?: [a-zA-Z]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    /*description: Yup.string()
        //.trim()
        .matches(/^[^\s].*[^\s]$/, 'No puede estar vacío')
        .required('La descripcion es requerida'),*/

    category_img: Yup.string().trim().required('La imagen es requerida'),
})

export const updateCategoryValidations = Yup.object({

    name: Yup.string()
        .trim()
        .required('El titulo es requerido')
        //.matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-Z]+(?: [a-zA-Z]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    /*description: Yup.string()
        //.trim()
        .matches(/^[^\s].*[^\s]$/, 'No puede estar vacío')
        .required('La descripcion es requerida'),*/

    category_img: Yup.string().trim().required('La imagen es requerida'),
})

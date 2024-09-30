import * as Yup from 'yup';

const isUpdate = false;


export const articleValidations = Yup.object({

    title: Yup.string()
        .trim()
        .required('El titulo es requerido')
        //.matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-Z]+(?: [a-zA-Z]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    content: Yup.string()
        .trim()
        .matches(/^[^\s].*[^\s]$/, 'No puede estar vacío')
        .required('El texto es requerido'),

    post_day: Yup.string().trim().required('El dia es requerido'),

    post_month: Yup.string().trim().required('El mes es requerido'),

    post_year: Yup.string().trim().required('El año es requerido'),

    blog_img: Yup.string().trim().required('La imagen principal es requerida'),

    category: Yup.string().trim().required('El tipo del evento es requerido'),
})

export const updateArticleValidations = Yup.object({

    title: Yup.string()
        .trim()
        .required('El titulo es requerido')
        //.matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-Z]+(?: [a-zA-Z]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    content: Yup.string()
        .trim()
        .matches(/^[^\s].*[^\s]$/, 'No puede estar vacío')
        .required('El texto es requerido'),

    post_day: Yup.string().trim().required('El dia es requerido'),

    post_month: Yup.string().trim().required('El mes es requerido'),

    post_year: Yup.string().trim().required('El año es requerido'),

    blog_img: Yup.string().trim().required('La imagen principal es requerida'),

    category: Yup.string().trim().required('El tipo del evento es requerido'),
})


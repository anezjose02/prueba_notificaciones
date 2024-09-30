import * as Yup from 'yup';

const isUpdate = false;

export const teamValidations = Yup.object({

    profile_img: Yup.string().required('La foto de perfil es requerida'),

    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    company_professional: Yup.string().required('El compañia o profesion es requerida'),

    email: Yup.string()
        .email('El correo debe tener un formato válido')
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        //.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo debe contener letras, números y caracteres especiales')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'El correo no puede terminar con un caracter especial')
        .required('El correo es requerido'),

    phone: Yup.string()
        .trim()
        .required('El número telefónico es requerido')
        .matches(/^\d+$/, 'El número telefónico solo debe contener números')
        .test(
            'len',
            'El número telefónico debe tener entre 10 y 12 dígitos',
            (val) => val && val.length >= 10 && val.length <= 12
        ),

    type_talent: Yup.string().required('El tipo de talento es requerido'),


})

export const updatedTeamValidations = Yup.object({

    profile_img: Yup.string().required('La foto de perfil es requerida'),

    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    company_professional: Yup.string().required('El compañia o profesion es requerida'),

    email: Yup.string()
        .email('El correo debe tener un formato válido')
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        //.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo debe contener letras, números y caracteres especiales')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'El correo no puede terminar con un caracter especial')
        .required('El correo es requerido'),

    phone: Yup.string()
        .trim()
        .required('El número telefónico es requerido')
        .matches(/^\d+$/, 'El número telefónico solo debe contener números')
        .test(
            'len',
            'El número telefónico debe tener entre 10 y 12 dígitos',
            (val) => val && val.length >= 10 && val.length <= 12
        ),

    //type_talent: Yup.string().required('El tipo de talento es requerido'),
})

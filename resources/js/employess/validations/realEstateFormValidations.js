import * as Yup from 'yup';

const isUpdate = false;

export const realEstateValidations = Yup.object({

    profile_img: Yup.string().required('La foto de perfil es requerida'),

    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    email: Yup.string()
        .email('El correo debe tener un formato válido')
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        //.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo debe contener letras, números y caracteres especiales')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'Correo imcompleto')
        .required('El correo es requerido'),

    phone: Yup.string()
        .trim()
        .matches(/^\d+$/, "El número de teléfono solo puede contener dígitos")
        .min(10, "El número de teléfono no puede ser menor a 10 dígitos")
        .max(12, "El número de teléfono no puede ser mayor a 12 dígitos")
        .required('El número telefónico es requerido')

})

export const updatedRealEstateValidations = Yup.object({

    profile_img: Yup.string().required('La foto de perfil es requerida'),

    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    email: Yup.string()
        .email('El correo debe tener un formato válido')
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        //.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo debe contener letras, números y caracteres especiales')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'Correo imcompleto')
        .required('El correo es requerido'),

    phone: Yup.string()
        .trim()
        .matches(/^\d+$/, "El número de teléfono solo puede contener dígitos")
        .min(10, "El número de teléfono no puede ser menor a 10 dígitos")
        .max(12, "El número de teléfono no puede ser mayor a 12 dígitos")
        .required('El número telefónico es requerido')
})

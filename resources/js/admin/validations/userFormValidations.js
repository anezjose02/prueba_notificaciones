import * as Yup from 'yup';

const isUpdate = false;

export const usersValidations = Yup.object({
    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    last_name: Yup.string()
        .trim()
        .required('El apellido paterno es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El apellido paterno no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El apellido paterno no puede comenzar ni terminar con un espacio'),

    second_last_name: Yup.string()
        .trim()
        .required('El apellido materno es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El apellido materno no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El apellido materno no puede comenzar ni terminar con un espacio'),

    profile_img: Yup.string().required('La foto de perfil es requerida'),

    email: Yup.string()
        .trim()
        .email('El correo debe tener un formato válido')
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'El correo no puede terminar con un caracter especial')
        .required('El correo es requerido'),

    rol_id: Yup.string().required('El perfil es requerido'),

    password: Yup.string()
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida'),

    confirmPassword: Yup.string()
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida')
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
})

export const updatedUsersValidations = Yup.object({
    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

    last_name: Yup.string()
        .trim()
        .required('El apellido paterno es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El apellido paterno no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El apellido paterno no puede comenzar ni terminar con un espacio'),

    second_last_name: Yup.string()
        .trim()
        .required('El apellido materno es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El apellido materno no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El apellido materno no puede comenzar ni terminar con un espacio'),

    profile_img: Yup.string().required('La foto de perfil es requerida'),

    email: Yup.string()
        .trim()
        .email('El correo debe tener un formato válido')
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'El correo no puede terminar con un caracter especial')
        .required('El correo es requerido'),

    rol_id: Yup.string().required('El perfil es requerido'),

    /*password: Yup.string()
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida'),

    confirmPassword: Yup.string()
        .trim()
        .matches(/^\S+$/, 'No puede comenzar ni terminar con un espacio')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida')
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),*/
})


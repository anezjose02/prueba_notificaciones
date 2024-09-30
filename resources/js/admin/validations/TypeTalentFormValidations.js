import * as Yup from 'yup';

const isUpdate = false;

export const tTValidations = Yup.object({
    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

})

export const updatedTTValidations = Yup.object({
    name: Yup.string()
        .trim()
        .required('El nombre es requerido')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*$/, 'El nombre no debe contener números ni caracteres especiales')
        .matches(/^(?! )[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñ]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),

})


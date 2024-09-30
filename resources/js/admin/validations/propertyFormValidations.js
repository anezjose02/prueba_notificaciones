import * as Yup from 'yup';

const isUpdate = false;

export const propertyValidations = Yup.object({
    realEstateAgency: Yup.string()
        .trim()
        .when('showAdditionalFields', {
            is: true,
            then: Yup.string().required('El nombre de la inmobiliaria es requerido')
                .matches(/^(?! )[a-zA-Z]+(?: [a-zA-Z]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),
        }),

    email: Yup.string()
        .trim()
        .when('showAdditionalFields', {
            is: true,
            then: Yup.string().email('El correo debe tener un formato válido')
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'El correo no puede terminar con un caracter especial')
                .required('El correo es requerido'),
        }),

    phone: Yup.string()
        .trim()
        .when('showAdditionalFields', {
            is: true,
            then: Yup.string().required('El número telefónico es requerido')
                .test(
                    'len',
                    'El número telefónico debe tener entre 10 y 12 dígitos',
                    (val) => val && val.length >= 10 && val.length <= 12
                ),
        }),
    realEstate: Yup.string().trim().required('Seleccione una inmobiliaria'),
    availabilityType: Yup.string().trim().required('El tipo de disponibilidad es requerido'),
    propertyName: Yup.string().trim().required('El nombre de la propiedad es requerido'),
    propertyType: Yup.string().trim().required('El tipo de propiedad es requerido'),

    price: Yup.number()
        .typeError('El precio debe ser un número')
        .required('El precio de la propiedad es requerido')
        .positive('El precio debe ser un número positivo'),

    yearsOfAntiquity: Yup.number()
        .typeError('El año de antigüedad debe ser un número')
        .required('El año de antigüedad es requerido')
        .positive('Debe ser un número positivo'),

    constructedArea: Yup.number()
        .typeError('Los metros cuadrados construidos debe ser un número')
        .required('Los metros cuadrados construidos son requeridos')
        .positive('Debe ser un número positivo'),

    landArea: Yup.number()
        .typeError('Los metros cuadrados de terreno debe ser un número')
        .required('Los metros cuadrados de terreno son requeridos')
        .positive('Debe ser un número positivo'),
});

export const updatePropertyValidations = Yup.object({
    realEstateAgency: Yup.string()
        .trim()
        .when('showAdditionalFields', {
            is: true,
            then: Yup.string().required('El nombre de la inmobiliaria es requerido')
                .matches(/^(?! )[a-zA-Z]+(?: [a-zA-Z]+)*(?<! )$/, 'El nombre no puede comenzar ni terminar con un espacio'),
        }),

    email: Yup.string()
        .trim()
        .when('showAdditionalFields', {
            is: true,
            then: Yup.string().email('El correo debe tener un formato válido')
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+(?<![\W_])$/, 'El correo no puede terminar con un caracter especial')
                .required('El correo es requerido'),
        }),

    phone: Yup.string()
        .trim()
        .required('El número telefónico es requerido')
        .matches(/^\d+$/, 'El número telefónico solo debe contener números')
        .test(
            'len',
            'El número telefónico debe tener entre 10 y 12 dígitos',
            (val) => val && val.length >= 10 && val.length <= 12
        ),
    realEstate: Yup.string().trim().required('Seleccione una inmobiliaria'),
    availabilityType: Yup.string().trim().required('El tipo de disponibilidad es requerido'),
    propertyName: Yup.string().trim().required('El nombre de la propiedad es requerido'),
    propertyType: Yup.string().trim().required('El tipo de propiedad es requerido'),

    price: Yup.number()
        .typeError('El precio debe ser un número')
        .required('El precio de la propiedad es requerido')
        .positive('El precio debe ser un número positivo'),

    yearsOfAntiquity: Yup.number()
        .typeError('El año de antigüedad debe ser un número')
        .required('El año de antigüedad es requerido')
        .positive('Debe ser un número positivo'),

    constructedArea: Yup.number()
        .typeError('Los metros cuadrados construidos debe ser un número')
        .required('Los metros cuadrados construidos son requeridos')
        .positive('Debe ser un número positivo'),

    landArea: Yup.number()
        .typeError('Los metros cuadrados de terreno debe ser un número')
        .required('Los metros cuadrados de terreno son requeridos')
        .positive('Debe ser un número positivo'),
});

export const AddVideoValidations = Yup.object({
    url_video: Yup.string().trim().required('La url es requerida'),
    url_title: Yup.string().trim().required('El titulo es requerido'),
});

import {useState} from "react";
import PropTypes from 'prop-types';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Formik, Form} from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CustomFormInput} from "../../formik/CustomFormInput";
import {CustomFormSelect, CustomFormSelectService} from "../../formik/CustomFormSelect";
import {CustomImageDropzone} from "../../formik/CustomImageDropzone";
import {SwalReact} from "../../utils/SwalConfig";
import {updatedUsersValidations, usersValidations} from "../../validations/userFormValidations";
import {usePostMutationAdmin} from "../../hooks/UsePostMutationAdmin";

export const UsersForm = ({profiles, isUpdate, userData, reloadUsers }) => {

    const formHeader = (
        <div className={'modal-title mt-4'}>
            <h4>{!isUpdate ? 'Agregar Usuario' : 'Editar Usuario'}</h4>
        </div>
    );
    const formSubmitBtn = (
        <h5 className='mb-0 text-white medium-text'>
            {!isUpdate ? 'Agregar' : 'Modificar'}
        </h5>
    );

    const [visible, setVisible] = useState(false);
    const [showImageDropzone, setShowImageDropzone] = useState(isUpdate===true? false : true);
    const userMutation = usePostMutationAdmin(reloadUsers);
    const handleDialog = () => setVisible(!visible);

    const handleSubmit =  (isUpdate, values) => {
        if (isUpdate){
            try {
                SwalReact.fire({
                    title: '<div class="text-black-input">¿Estas seguro que quieres modificar este usuario?</div>',
                    text: 'La información se actualizará al confirmar.',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        userMutation.mutate({
                            url: 'admin.users.upsert',
                            params: {id: !isUpdate ? 'FAKE_ID' : userData.id},
                            data: formData(values)
                        });
                        handleDialog();
                    }
                })
            } catch (error) {
                SwalReact.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Error al '+text+': '+ error,
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    window.location.replace('/admin/');
                })
            }
        } else {
            userMutation.mutate({
                url: 'admin.users.upsert',
                params: {id: !isUpdate ? 'FAKE_ID' : userData.id},
                data: formData(values)
            });
            handleDialog();
        }
    };

    function formData(values){
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('last_name', values.last_name);
        formData.append('second_last_name', values.second_last_name);
        formData.append('email', values.email);
        formData.append('rol_id', values.rol_id);
        formData.append('password', values.password);
        formData.append('confirmPassword', values.confirmPassword);
        formData.append('profile_img', values.profile_img);
        return formData;
    }

    const handleUpdateData = () => {
        if (isUpdate) {
            return {
                name: userData.name,
                last_name: userData.last_name,
                second_last_name: userData.second_last_name,
                email: userData.email,
                rol_id: userData.user_rol_id,
                profile_img: userData && userData.image ? userData.image.url : '',
                password: '',
                confirmPassword: ''
            }
        } else {
            return {
                name: '',
                last_name: '',
                second_last_name: '',
                email: '',
                rol_id: '',
                password: '',
                confirmPassword: '',
                profile_img: ''
            }
        }
    }

    return (
        <>
            {isUpdate
                ? <div>
                    <img
                        className={'edit-icon'}
                        src={'/assets/Administrador/icons/edit.svg'}
                        onClick={handleDialog}
                    />
                </div>
                : <div className="card flex justify-content-start border-0">
                    <Button
                        onClick={handleDialog}
                        className='modal-btn'
                        icon="pi pi-plus"
                        label="Agregar usuario"
                        raised
                        style={{ whiteSpace: 'nowrap', color: 'black' }}
                    />
                </div>
            }
            <Dialog
                header={formHeader}
                visible={visible}
                style={{ width: '700px', height:'620px', borderRadius: '40px' }}
                onHide={handleDialog}
            >
                <Formik
                    initialValues={handleUpdateData()}
                    onSubmit={(values) => handleSubmit(isUpdate, values)}
                    validationSchema={isUpdate ? updatedUsersValidations : usersValidations}
                >
                    {(formik) => (
                        <Form>
                            <Row>
                                <Col md={12}>
                                    <div className={'col-mb-4'}>
                                        {
                                            showImageDropzone === true
                                                ?
                                                <CustomImageDropzone
                                                    name='profile_img'>
                                                </CustomImageDropzone>
                                                :
                                                <div className='dropzone'>
                                                    <img
                                                        className={'dropzone-icon'}
                                                        src={handleUpdateData().profile_img}
                                                        onClick={() => {
                                                            formik.setFieldValue('profile_img', '');
                                                            setShowImageDropzone(true);
                                                        }
                                                        }
                                                    />
                                                </div>

                                        }
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <CustomFormInput
                                        name='name'
                                        placeholder='Nombre'
                                    />
                                </Col>

                                <Col md={6}>
                                    <CustomFormInput
                                        name='second_last_name'
                                        placeholder='Apellido Materno'
                                    />
                                </Col>

                                <Col md={6}>
                                    <CustomFormInput
                                        name='last_name'
                                        placeholder='Apellido Paterno'
                                    />
                                </Col>

                                <Col md={6}>
                                    <CustomFormSelectService placeholder='Perfil' name='rol_id' options={profiles}/>
                                </Col>

                                <Col md={12}>
                                <CustomFormInput
                                        placeholder='E-mail'
                                        name='email'
                                        type='email'
                                    />
                                </Col>

                                <Col md={12}>
                                    <h4 className={'text-black bold'}>Contraseña</h4>
                                </Col>

                                <Col md={6}>
                                    <CustomFormInput
                                        placeholder='Contraseña'
                                        name='password'
                                        type='password'
                                    />
                                </Col>

                                <Col md={6}>
                                    <CustomFormInput
                                        placeholder='Confirmar contraseña'
                                        name='confirmPassword'
                                        type='password'
                                    />
                                </Col>

                                <div className='field mt-2 mb-4 flex justify-content-center'>
                                <Button
                                    className='modal-btn'
                                    label={formSubmitBtn}
                                    type="submit"
                                />
                                </div>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}

UsersForm.propTypes = {
    isUpdate: PropTypes.bool,
    profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
    userData: PropTypes.object,
    reloadUsers:PropTypes.func
}

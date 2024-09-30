import React, { useState, useEffect, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import { SwalReact } from "../../utils/SwalConfig";
import { usePostMutationAdmin } from "../../hooks/UsePostMutationAdmin";
import { useFetchQuery } from "../../../admin/hooks/UseFetchQuery";
import { CustomImageDropzone } from "../../../admin/formik/CustomImageDropzone";
import { CustomFormInput } from "../../../admin/formik/CustomFormInput";
import { Button } from 'primereact/button';
import Container from 'react-bootstrap/Container';

export const Users = () => {
    const [userData, setUserData] = useState(null);
    const [isUpdate, setIsUpdate] = useState(true);
    const [showImageDropzone, setShowImageDropzone] = useState(false);

    const params = {};
    const usersQuery = useFetchQuery('employess.users.index_content', params, 'users');
    const userMutation = usePostMutationAdmin(() => usersQuery.refetch());

    useEffect(() => {
        if (usersQuery?.data?.users) {
            setUserData(usersQuery.data.users);
        }
    }, [usersQuery?.data?.users]);

    const handleSubmit = (isUpdate, values, userData) => {

        if (isUpdate) {
            SwalReact.fire({
                title: '<div class="text-black-input">¿Estás seguro que quieres modificar tu información?</div>',
                text: 'La información se actualizará al confirmar.',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    userMutation.mutate({
                        url: 'employess.users.upsert',
                        params: { id: userData[0].id },
                        data: formData(values)
                    });
                }
            });
        }
    };

    function formData(values) {
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

    const handleUpdateData = (userData) => {
        const user = userData[0] || {};

        return {
            name: user.name || '',
            last_name: user.last_name || '',
            second_last_name: user.second_last_name || '',
            email: user.email || '',
            rol_id: user.user_rol_id || '',
            profile_img: user.image?.url || '',
            password: '',
            confirmPassword: ''
        };
    };


    return (
        <Container fluid className="padding-table">
            <Row className="mt-2">
                {userData && (
                    <Formik
                        enableReinitialize={true}
                        initialValues={handleUpdateData(userData)}
                        onSubmit={(values) => handleSubmit(isUpdate, values, userData)}
                    >
                        {(formik) => (
                            <Form>
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-center">
                                        {showImageDropzone ? (
                                            <CustomImageDropzone name="profile_img" />
                                        ) : (
                                            <div className="dropzone">
                                                <img
                                                    className="dropzone-icon"
                                                    src={handleUpdateData(userData).profile_img}
                                                    alt="profile"
                                                    onClick={() => {
                                                        formik.setFieldValue("profile_img", "");
                                                        setShowImageDropzone(true);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Col>

                                    <Col md={8}>
                                        <Row>
                                            <Col md={12}>
                                                <CustomFormInput name="name" placeholder="Nombre" />
                                            </Col>

                                            <Col md={6}>
                                                <CustomFormInput name="last_name" placeholder="Apellido Paterno" />
                                            </Col>

                                            <Col md={6}>
                                                <CustomFormInput name="second_last_name" placeholder="Apellido Materno" />
                                            </Col>

                                            <Col md={12}>
                                                <CustomFormInput name="email" placeholder="E-mail" type="email" readOnly />
                                            </Col>

                                            <Col md={12}>
                                                <h4 className="text-black bold">Contraseña</h4>
                                            </Col>

                                            <Col md={6}>
                                                <CustomFormInput name="password" placeholder="Contraseña" type="password" />
                                            </Col>

                                            <Col md={6}>
                                                <CustomFormInput
                                                    name="confirmPassword"
                                                    placeholder="Confirmar contraseña"
                                                    type="password"
                                                />
                                            </Col>

                                            <Col md={4}>
                                                <Button
                                                    className="modal-btn mt-4"
                                                    label="Actualizar"
                                                    type="submit"
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                )}
            </Row>
        </Container>
    );
};

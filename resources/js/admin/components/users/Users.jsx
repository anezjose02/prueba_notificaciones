import React, { useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Formik, Form} from 'formik';
import {UsersForm} from "./UsersForm";
import {SwalReact} from "../../utils/SwalConfig";
import {CustomInputFilter} from "../../formik/CustomFilter";
import {useFetchQuery} from "../../hooks/UseFetchQuery";



export const Users = () => {
    const params = {};
    const usersQuery = useFetchQuery('admin.users.index_content', params, 'users');

    const authUserQuery = useFetchQuery('admin.users.getAuthUser', params, 'authUser');
    const authUserId = authUserQuery?.data?.user?.id
    const [searchTerm, setSearchTerm] = useState('');

    const profiles = usersQuery?.data?.profiles;

    const reloadUsers = useCallback(() => {
        usersQuery.refetch();
    }, [usersQuery]);

    const handleToggle =  (active, userId) => {
        try {
            let title = active ? "desactivar" : "activar";
            let text = active ? "desactivar" : "activar";
            let confirmText = active ? "Al confirmar, el usuario ya no podrá ingresar al sistema." : "Al confirmar, el usuario podrá ingresar al sistema.";

            SwalReact.fire({
                title: '<div class="text-black-input">¿Estás seguro que quieres ' + title + ' este usuario?</div>',
                text: confirmText,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    axios.post(route("admin.users.status",{id: userId}))
                        .then(response => {
                            let icon = response.data.success ? 'success' : 'error';
                            SwalReact.fire({
                                icon: icon,
                                title: response.data.title,
                                text: response.data.message,
                                showConfirmButton: false,
                                timer: 2000,
                            }).then(() => {
                                usersQuery.refetch();
                            })
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            })
        } catch (error) {
            SwalReact.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Error al ' + text + ': ' + error,
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                window.location.replace('/admin/');
            })
        }
    };


    const avatarBody = (rowData) => (
        <img
            className={'avatar-table'}
            src={rowData?.image?.url}
            alt="experts"
        />

    )

    const filteredUser = usersQuery.data && usersQuery.data.users
        ? usersQuery.data.users.filter(users =>
            users.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleFilterData = () => {
        return {
            search: '',
        }
    }

    const handleEraser = (setFieldValue) => {
        setFieldValue('search', '');
        setSearchTerm('');
    };

    const rowsPerPageOptions = [5, 10, 20];

    return(
        <Container fluid className="padding-table">
            <Row className="mt-2">
                <Col md={12} className='d-flex justify-content-end'>
                    <UsersForm
                        profiles={usersQuery.data ? usersQuery.data.profiles : []}
                        reloadUsers={reloadUsers}
                    />
                </Col>
                <Col md={12} className={'mt-2'}>
                    <Formik
                        initialValues={handleFilterData()}
                        onSubmit={(values) => console.log()}
                    >
                        {(formik) => (
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <div className={'d-flex justify-content-start mt-2'}>
                                            <div>
                                                <CustomInputFilter
                                                    name="search"
                                                    label="Buscar"
                                                    placeholder={'Nombre'}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('search', e.target.value);
                                                        setSearchTerm(e.target.value);
                                                    }}
                                                    value={formik.values.search}
                                                />
                                            </div>
                                            <div style={{
                                                marginLeft: '15px'
                                            }}>
                                                <img
                                                    className={'filter-icon'}
                                                    src={'/assets/Administrador/icons/erase.svg'}
                                                    onClick={() => handleEraser(formik.setFieldValue)}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
            <Row className="mt-2 bg-gray-light p-3 rounded-4 h-100 d-flex flex-column">
                <Col>
                    {filteredUser && filteredUser.length > 0 ? (
                        <DataTable
                            paginator
                            rows={5}
                            stripedRows={false}
                            rowClassName="custom-row-style"
                            tableStyle={{minWidth: '50rem'}}
                            value={filteredUser}
                        >
                            <Column
                                header="Nombre"
                                body={(rowData) => (
                                    <div style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                                        <div>
                                            {avatarBody(rowData)}
                                        </div>
                                        <div style={{ marginLeft: '10px' }}>
                                            {rowData.name}
                                        </div>
                                    </div>
                                )}
                                bodyStyle={{ whiteSpace: 'nowrap' }}
                            />

                            <Column
                                field="email"
                                header="Correo electrónico"
                                bodyStyle={{ whiteSpace: 'nowrap' }}
                            />

                            <Column
                                field="role.name"
                                header="Perfil"
                                bodyStyle={{ whiteSpace: 'nowrap' }}
                            />

                            <Column
                                header=''
                                body={rowData => (
                                    <div className="icon-group">
                                        {authUserId !== rowData.id &&
                                            <img
                                                onClick={() => handleToggle(rowData.active, rowData.id)}
                                                className={'toggle-btn-icon'}
                                                src={rowData.active ? '/assets/Administrador/icons/toggle-on.svg' : '/assets/Administrador/icons/toggle-off.svg'}
                                            />
                                        }
                                        <UsersForm
                                            profiles={usersQuery.data.profiles}
                                            userData={rowData}
                                            isUpdate={true}
                                            reloadUsers={reloadUsers}
                                        />
                                    </div>
                                )}
                            />
                        </DataTable>
                    ) : (
                        <div>Sin usuarios registrados</div>
                    )}
                </Col>
            </Row>

        </Container>
    )
}


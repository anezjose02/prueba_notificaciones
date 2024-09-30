import React, {createRef, useEffect, useRef, useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Formik, Form} from 'formik';
import {useFetchQuery} from "../../hooks/UseFetchQuery";
import {CustomInputFilter} from "../../formik/CustomFilter";
import {TasksForm} from "./TasksForm";
import {SwalReact} from "../../utils/SwalConfig";


export const Tasks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const params = {};
    const tasksQuery = useFetchQuery('employess.tasks.index_content', params, 'tasks');
    const reloadTasks = useCallback(() => {
        tasksQuery.refetch();
    }, [tasksQuery]);

    const handleFilterData = () => {
        return {
            search: '',
        }
    }

    const handleEraser = (setFieldValue) => {
        setFieldValue('search', '');
        setSearchTerm('');
    };

    const filteredTasks = tasksQuery.data && tasksQuery.data.tasks
        ? tasksQuery.data.tasks.filter(tasks =>
            tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleToggleTasks = (active, tasksId) => {
        try {
            let title = !active ? "eliminar" : "recuperar" ;
            let text = !active ? "desactivaran" : "activaran";
            SwalReact.fire({
                title: '<div class="text-black-input">¿Esta seguro que quieres '+title+' esta tarea?</div>',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    axios.post(route("employess.tasks.status_delete",{id: tasksId}))
                        .then(response => {
                            let icon = response.data.success ? 'success' : 'error';
                            SwalReact.fire({
                                icon: icon,
                                title: response.data.title,
                                text: response.data.message,
                                showConfirmButton: false,
                                timer: 2000,
                            }).then(() => {
                                reloadTasks().refetch();
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
                text: 'Error al '+text+': '+ error,
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                window.location.replace('/admin/');
            })
        }
    };

    const employees = tasksQuery.data && tasksQuery.data.employees;

    const statusBodyTemplate = (rowData) => {
        return (
            <span style={getStatusStyle(rowData.status.name)}>
                {rowData.status.name}
            </span>
        );
    };

    const getStatusStyle = (statusName) => {
        switch (statusName) {
            case 'Entregado':
                return { backgroundColor: 'yellow', padding: '0.5em', borderRadius: '4px' };
            case 'Leido':
                return { backgroundColor: 'blue', padding: '0.5em', borderRadius: '4px' };
            case 'Pendiente':
                return { backgroundColor: 'red', padding: '0.5em', borderRadius: '4px', color: 'white' };
            case 'Completado':
                return { backgroundColor: 'green', padding: '0.5em', borderRadius: '4px', color: 'white' };
            default:
                return {};
        }
    };

    return (
        <Container fluid className="padding-table">
            <Row className="mt-2 bg-gray-light p-3 rounded-4 h-100 d-flex flex-column">
                <Col md={12} className='d-flex justify-content-end'>
                    <TasksForm
                        reloadTasks={reloadTasks}
                        employees = {employees}
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
                                                    placeholder={'Titulo'}
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
                <Col>
                    {filteredTasks && filteredTasks.length > 0 ? (
                        <DataTable
                            paginator
                            rows={5}
                            stripedRows={false}
                            rowClassName="custom-row-style"
                            tableStyle={{ minWidth: '50rem' }}
                            value={filteredTasks}
                        >

                            <Column
                                field="title"
                                header='Titulo'
                                bodyStyle={{ whiteSpace: 'nowrap', textAlign: 'start' }}
                            />

                            <Column
                                header="Asignado por"
                                body={(rowData) => `${rowData.user_from.name} ${rowData.user_from.last_name}`}
                                bodyStyle={{ whiteSpace: 'nowrap', textAlign: 'start' }}
                            />

                            <Column
                                field="status.name"
                                header='Estado'
                                body={statusBodyTemplate}
                                bodyStyle={{ whiteSpace: 'nowrap', textAlign: 'start' }}
                            />

                            <Column
                                header=''
                                body={rowData => (
                                    <div className="icon-group">
                                        <img
                                            onClick={() => handleToggleTasks(rowData.active, rowData.id)}
                                            className={'toggle-btn-icon'}
                                            src={
                                                [1, 2, 3, 4].includes(rowData.tasks_status_id)
                                                    ? '/assets/Administrador/icons/toggle-on.svg'
                                                    : '/assets/Administrador/icons/toggle-off.svg'
                                            }
                                        />
                                        <TasksForm
                                            tasksData={rowData}
                                            isUpdate={true}
                                            reloadTasks={reloadTasks}
                                            employees = {employees}
                                        />
                                    </div>
                                )}
                            />

                        </DataTable>
                    ) : (
                        <div>Sin tareas registradas</div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

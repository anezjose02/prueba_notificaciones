import { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Formik, Form } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CustomFormInput, CustomFormTextArea } from "../../formik/CustomFormInput";
import { SwalReact } from "../../utils/SwalConfig";
import { usePostMutationAdmin } from "../../hooks/UsePostMutationAdmin";
import { CustomFormSelectService } from "../../formik/CustomFormSelect";

export const TasksForm = ({ isUpdate, tasksData, reloadTasks, employees }) => {
    const [visible, setVisible] = useState(false);
    const [canClose, setCanClose] = useState(true);
    const userMutation = usePostMutationAdmin(reloadTasks);

    const formHeader = (
        <div className={'modal-title mt-4'}>
            <h4 style={{ margin: '0px' }}>{!isUpdate ? 'Agregar Tarea' : 'Ver Tarea'}</h4>
        </div>
    );

    const formSubmitBtn = (
        <h5 className='mb-0 text-white medium-text'>
            {!isUpdate ? 'Agregar' : 'Modificar'}
        </h5>
    );

    const handleDialog = () => {
        if (canClose) {
            setVisible(!visible);
        }
    };

    const handleSubmit = (isUpdate, values) => {
        userMutation.mutate({
            url: 'employess.tasks.status',
            params: {id: !isUpdate ? 'FAKE_ID' : tasksData.id},
            data: { status: values.status },
        });
        setCanClose(true);
        handleDialog();
    };

    const handleUpdateData = () => {
        if (isUpdate) {
            return {
                title: tasksData.title,
                description: tasksData.description,
                user_id: tasksData.user_id,
                status: tasksData.status,
            }
        } else {
            return {
                title: '',
                description: '',
                user_id: '',
                status: '',
            }
        }
    }

    const employee = employees?.map(emp => ({
        name: `${emp.name} ${emp.last_name}`
    }));

    const statusOptions = [
        { id: 2, name: 'Marcar como leído' },
        { id: 3, name: 'Marcar como pendiente' },
        { id: 4, name: 'Marcar como completado' },
    ];

    return (
        <>
            {isUpdate
                ? <div>
                    <img
                        className={'toggle-btn-icon'}
                        src={'/assets/Administrador/icons/edit1.svg'}
                        onClick={handleDialog}
                    />
                </div>
                : <div className="card flex justify-content-start border-0"></div>
            }
            <Dialog
                header={formHeader}
                visible={visible}
                style={{ width: '700px', borderRadius: '20px' }}
                onHide={() => { /*  */ }}
            >
                <Formik
                    initialValues={handleUpdateData()}
                    onSubmit={(values) => handleSubmit(isUpdate, values)}
                >
                    {(formik) => (
                        <Form>
                            <Row className={''}>
                                <Col md={12}>
                                    <div className='mt-2'>
                                        <CustomFormInput
                                            placeholder='Empleado'
                                            name='user_id'
                                            value={employee}
                                        />
                                    </div>

                                    <div className='mt-2'>
                                        <CustomFormInput
                                            placeholder='Título'
                                            name='title'
                                            readOnly
                                        />
                                    </div>

                                    <div className='mt-2'>
                                        <CustomFormTextArea
                                            placeholder='Descripción'
                                            name='description'
                                            rows={6}
                                            readOnly
                                        />
                                    </div>

                                    <div className='mt-2'>
                                        <CustomFormSelectService
                                            placeholder='Estado'
                                            name='status'
                                            options={statusOptions}
                                        />
                                    </div>
                                </Col>

                                <div className='field mb-4 mt-2 flex justify-content-center'>
                                    <Button
                                        className='modal-btn-double-red'
                                        label={formSubmitBtn}
                                        type="submit"
                                        style={{ marginLeft: '10px' }}
                                    />
                                </div>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};

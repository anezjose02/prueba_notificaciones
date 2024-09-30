import {useState} from "react";
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Formik, Form} from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CustomFormInput, CustomFormTextArea} from "../../formik/CustomFormInput";
import {SwalReact} from "../../utils/SwalConfig";
import {usePostMutationAdmin} from "../../hooks/UsePostMutationAdmin";
import JoditEditor from 'jodit-react';
import {CustomFormSelectService} from "../../formik/CustomFormSelect";

export const TasksForm = ({isUpdate, tasksData, reloadTasks, employees }) => {

    const formHeader = (
        <div className={'modal-title mt-4'}>
            <h4 style={{margin: '0px'}}>{!isUpdate ? 'Agregar Tarea' : 'Editar Tarea'}</h4>
        </div>
    );
    const formSubmitBtn = (
        <h5 className='mb-0 text-white medium-text'>
            {!isUpdate ? 'Agregar' : 'Modificar'}
        </h5>
    );

    const textModal = (
        <p style={{textAlign: 'center', fontSize: '17px'}}>
            {!isUpdate ? 'Por favor, introduce el nuevo tipo de talento que deseas añadir a la lista:' : 'Por favor, modifica el tipo de talento:'}
        </p>
        )
    ;

    const [visible, setVisible] = useState(false);
    const userMutation = usePostMutationAdmin(reloadTasks);
    const handleDialog = () => setVisible(!visible);

    const handleSubmit =  (isUpdate, values) => {
        if (isUpdate){
            try {
                SwalReact.fire({
                    title: '<div class="text-black-input">¿Estas seguro que quieres modificar este tipo de talento?</div>',
                    text: 'La información se actualizará al confirmar.',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        userMutation.mutate({
                            url: 'admin.tasks.upsert',
                            params: {id: !isUpdate ? 'FAKE_ID' : tasksData.id},
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
                url: 'admin.tasks.upsert',
                params: {id: !isUpdate ? 'FAKE_ID' : tasksData.id},
                data: formData(values)
            });
            handleDialog();
        }
    };

    function formData(values){
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('user_id', values.user_id);
        return formData;
    }

    const handleUpdateData = () => {
        if (isUpdate) {
            return {
                title: tasksData.title,
                description: tasksData.description,
                user_id: tasksData.user_id,
            }
        } else {
            return {
                title: '',
                description: '',
                user_id: '',
            }
        }
    }

    const employeeOptions = employees?.map(emp => ({
        id: emp.id,
        name: `${emp.name} ${emp.last_name}`
    }));

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
                : <div className="card flex justify-content-start border-0">
                    <Button
                        onClick={handleDialog}
                        className='modal-btn'
                        icon="pi pi-plus"
                        label="Agregar tarea"
                        raised
                        style={{ whiteSpace: 'nowrap', color: 'black' }}
                    />
                </div>
            }
            <Dialog
                header={formHeader}
                visible={visible}
                style={{ width: '700px', borderRadius: '20px' }}
                onHide={handleDialog}
            >
                <Formik
                    initialValues={handleUpdateData()}
                    onSubmit={(values) => handleSubmit(isUpdate, values)}
                    //validationSchema={isUpdate ? updatedTTValidations : tTValidations}
                >
                    {(formik) => (
                        <Form>
                            <Row className={''}>

                                <Col md={12}>
                                    <div className='mt-2'>
                                        <CustomFormSelectService
                                            placeholder='Empleado'
                                            name='user_id'
                                            options={employeeOptions}/>
                                    </div>

                                    <div className='mt-2'>
                                        <CustomFormInput
                                            placeholder='Titulo'
                                            name='title'/>
                                    </div>

                                    <div className='mt-2'>
                                        <CustomFormTextArea
                                            placeholder='Descripcion'
                                            name='description'
                                            rows={6}
                                        />
                                    </div>
                                </Col>

                                <div className='field mb-4 mt-2 flex justify-content-center'>
                                    <Button
                                        className='modal-btn-double-grey'
                                        label={'Cancelar'}
                                        type="button"
                                        style={{marginRight:'10px'}}
                                        onClick={handleDialog}
                                    />
                                    <Button
                                        className='modal-btn-double-red'
                                        label={formSubmitBtn}
                                        type="submit"
                                        style={{marginLeft:'10px'}}
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


import {Button} from 'primereact/button';
import {Formik, Form} from 'formik';
import {CustomFormInput, CustomFormLoginInput} from "../admin/formik/CustomFormInput";
import {usePostMutation} from "../admin/hooks/UsePostMutationAuth";

export const LoginForm = () => {
    const userMutation = usePostMutation();
    const handleSubmit = (values) => {
        userMutation.mutate({
            url: 'auth.authenticate',
            params: {},
            data: values
        });
    }
    const handleData = () => {
        return {
            email: '',
            password: '',
        }
    }
    return (
        <>
            <Formik
                initialValues={handleData()}
                onSubmit={(values) => handleSubmit(values)}
            >
                {(formik) => (
                    <Form className='forms'>
                        <div className='field mb-4' style={{width: '100%'}}>
                            <CustomFormLoginInput label='Correo electrónico' name='email' type='text'/>
                        </div>
                        <div className='field mb-4' style={{width: '100%'}}>
                            <CustomFormLoginInput label='Contraseña'  name='password' type='password'/>
                        </div>
                        <div className='field my-5 flex justify-content-center'>
                            <Button
                                className='login-btn'
                                label="Iniciar sesión"
                                rounded
                                severity="warning"
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

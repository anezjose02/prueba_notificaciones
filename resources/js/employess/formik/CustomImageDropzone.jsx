import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import {Message} from 'primereact/message';
import {SwalReact} from "../utils/SwalConfig";


export const CustomImageDropzone = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props.name);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const newFile = acceptedFiles[0];
            if (newFile.size <= 1 * 1024 * 1024) {
                helpers.setValue(newFile);
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            } else {
                SwalReact.fire({
                    icon: 'error',
                    title: 'El archivo debe ser menor o igual a 1MB.',
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        },
        [helpers]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
        maxFiles: 1
    });

    const removeFile = (fileToRemove) => {
        const updatedFiles = field.value.filter(file => file !== fileToRemove);
        helpers.setValue(updatedFiles);
    };

    const CustomErrorMessage = ({children}) => {
        return (
            <Message severity="error" text={children} className='formErrorMessage mt-1'/>
        )
    }

    const renderDropzone = () => {
        return (
            <>
                <div {...getRootProps()} className='dropzone'>
                    <input {...getInputProps()} />
                    {!isDragActive && (
                        files.length === 0 ? (
                            <img src={'/assets/Administrador/icons/add-profile.svg'} className={'dropzone-icon'} />
                        ) : null
                    )}
                    <ErrorMessage name={props.name} component={CustomErrorMessage} />
                    <aside className='dz-preview-container'>
                        {files.map(file => (
                            <div key={file.name}>
                                <div className='dz-preview-inner'>
                                    <img
                                        src={file.preview}
                                        className='dropzone-icon'
                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                    />
                                </div>
                            </div>
                        ))}
                    </aside>
                </div>
            </>
        );
    };

    return (
        <>
            {label && (
                <p htmlFor={props.id || props.name}>{label}</p>
            )}
            {renderDropzone()}
        </>
    )
};

export const CustomImageDropzoneBlog = ({ isCategory, label, ...props }) => {
    const [field, meta, helpers] = useField(props.name);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const newFile = acceptedFiles[0];
            if (newFile.size <= 1 * 1024 * 1024) {
                helpers.setValue(newFile);
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            } else {
                SwalReact.fire({
                    icon: 'error',
                    title: 'El archivo debe ser menor o igual a 1MB.',
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        },
        [helpers]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
        maxFiles: 1
    });

    const removeFile = (fileToRemove) => {
        const updatedFiles = field.value.filter(file => file !== fileToRemove);
        helpers.setValue(updatedFiles);
    };

    const CustomErrorMessage = ({children}) => {
        return (
            <Message severity="error" text={children} className='formErrorMessage mt-1'/>
        )
    }

    const renderDropzone = () => {
        return (
            <>
                <div {...getRootProps()} className={isCategory ? 'drop-container-category' : 'drop-container'}>
                    <div className="image-wrapper">
                        {!isDragActive && (
                            files.length === 0 ? (
                                <img src={'/assets/Administrador/icons/image.svg'} className={'dropzone-icon'}/>
                            ) : null
                        )}
                    </div>
                    <div className="drop-text">Arrastra y suelta imágenes aquí</div>
                    <input {...getInputProps()} />

                    <ErrorMessage name={props.name} component={CustomErrorMessage}/>
                    <aside className=''>
                        {files.map(file => (
                            <div key={file.name}>
                                <div className=''>
                                    <img
                                        src={file.preview}
                                        className='img-blog'
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview)
                                        }}
                                    />

                                </div>
                            </div>
                        ))}
                    </aside>
                </div>
            </>
        );
    };

    return (
        <>
            {label && (
                <p htmlFor={props.id || props.name}>{label}</p>
            )}
            {renderDropzone()}
        </>
    )
};


import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import {Message} from 'primereact/message';
import {SwalReact} from "../utils/SwalConfig";

export const CustomFormFile = ({ label, mode, allowedFiles, ...props }) => {
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
                <div {...getRootProps()}
                     className='d-flex align-items-center justify-content-center'
                     style={{
                         height: '200px',
                         border: `2px dashed var(--color-blue-input)`,
                         borderRadius: '10px',
                         cursor: 'pointer',
                         overflow: 'hidden',
                         ...props.style
                     }}
                >
                    <input {...getInputProps()} />
                    {!isDragActive && (
                        files.length === 0 ? (
                            <img src={'/assets/Administrador/icons/image.svg'}/>
                        ) : null
                    )}
                    <ErrorMessage name={props.name} component={CustomErrorMessage} />
                    <aside className='dz-preview-container'>
                        {files.map(file => (
                            <div className='dz-preview' key={file.name}>
                                <div className='dz-preview-inner'>
                                    <img
                                        src={file.preview}
                                        className='dz-preview-img'
                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                        style={{ maxWidth: '150px', maxHeight: '150px' }}
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

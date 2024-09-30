import {ErrorMessage, useField} from 'formik';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Message} from 'primereact/message';
import {InputNumber} from "primereact/inputnumber";
import { RadioButton } from 'primereact/radiobutton';


const CustomErrorMessage = ({children}) => {
    return (
        <Message severity="error" text={children} className='formErrorMessage mt-1'/>
    )
}

export const CustomInputRadio = ({ label, options, selectedValue, ...props }) => {
    const [field] = useField(props);

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label>{label}</label>
            <div>
                {options.map((option, index) => (
                    <div key={index} className="p-mb-1">
                        <RadioButton
                            id={`${field.name}-${index}`}
                            name={field.name}
                            value={option.value}
                            onChange={(e) => field.onChange({ target: { value: e.value, name: field.name } })}
                            checked={selectedValue === option.value}
                            {...props}
                        />
                        <label htmlFor={`${field.name}-${index}`} className="p-ml-2">{option.label}</label>
                    </div>
                ))}
            </div>
            <ErrorMessage name={field.name} component={CustomErrorMessage} />
        </div>
    );
};

export const CustomFormInput = ({ label, iconSrc, placeholder, type, ...props }) => {
    const [field] = useField(props);
    const isNumberInput = type === 'number';

    return (
        <div style={{position: 'relative', marginBottom: '1rem'}}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <div>
                <InputText
                    {...field}
                    {...props}
                    placeholder={placeholder}
                    type={isNumberInput ? 'text' : type}
                    inputMode={isNumberInput ? 'numeric' : 'text'}
                    pattern={isNumberInput ? '[0-9]*' : undefined}
                    className='w-full'
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </div>
    );
};

export const CustomFormLoginInput = ({ label, iconSrc, placeholder, type, ...props }) => {
    const [field] = useField(props);
    const isNumberInput = type === 'number';

    return (
        <div style={{position: 'relative', marginBottom: '1rem'}}>
            <label style={{color:'#181818'}} htmlFor={props.id || props.name}>{label}</label>
            <div>
                <InputText
                    {...field}
                    {...props}
                    placeholder={placeholder}
                    type={isNumberInput ? 'text' : type}
                    inputMode={isNumberInput ? 'numeric' : 'text'}
                    pattern={isNumberInput ? '[0-9]*' : undefined}
                    className='w-full-login'
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </div>
    );
};

export const CustomFormInputSetting = ({label, ...props}) => {
    const [field] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <InputText {...field} {...props} autoComplete="off" className='w-full'/>
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </>
    )
}


export const CustomFormTextArea = ({label, iconSrc, ...props}) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <div>
                <InputTextarea
                    {...field}
                    {...props}
                    autoComplete="off"
                    className='custom-input w-full'
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage} />
        </>
    );
};

export const CustomFormTextAreaFAQ = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <div>
                <InputTextarea
                    {...field}
                    {...props}
                    autoComplete="off"
                    className={`w-full`}
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage} />
        </>
    );
};

export const CustomFormTextAreaReport = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <div>
                <InputTextarea
                    {...field}
                    {...props}
                    autoComplete="off"
                    className={`w-full`}
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage} />
        </>
    );
};

/*export const CustomFormLoginInput = ({label, iconSrc, placeholder, ...props}) => {
    const [field] = useField(props);
    return (
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <label htmlFor={props.id || props.name} className={'login-input-label'}>
                {label}
            </label>
            <div
                style={{
                    position: 'relative',
                    backgroundColor: '#282828',
                    padding: '10px',
                    borderRadius: '5px',
                    paddingLeft: '40px'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none'
                    }}
                >
                    <img src={iconSrc} alt={label} />
                </div>
                <InputText
                    {...field} {...props} placeholder={placeholder}
                    style={{ backgroundColor: '#282828 !important' }}
                    className='login-input w-full'
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage} />
        </div>
    );
};*/


export const CustomFormNumber = ({label,iconSrc, ...props}) => {
    const [field] = useField(props);
    return (
        <>
            <div style={{position: 'relative', marginBottom: '1rem'}}>
                <label htmlFor={props.id || props.name} className={'login-input-label'}>
                    {label}
                </label>
                <div
                    style={{
                        position: 'relative',
                        backgroundColor: '#F0F2F3',
                        padding: '10px',
                        borderRadius: '10px',
                        paddingLeft: '40px'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                        }}
                    >
                        <img src={iconSrc} alt={label}/>
                    </div>
                    <InputNumber
                        {...field} {...props}
                        autoComplete="off"
                        className="p-inputtext p-component custom-input w-full custom-input w-full"
                    />
                </div>
                <ErrorMessage name={props.name} component={CustomErrorMessage}/>
            </div>
        </>
    )
}

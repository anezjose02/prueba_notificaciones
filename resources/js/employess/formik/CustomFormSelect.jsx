import {ErrorMessage, useField} from 'formik';
import {Dropdown} from 'primereact/dropdown';
import {Message} from 'primereact/message';

export const CustomErrorMessage = ({children}) => {
    return (
        <Message severity="error" text={children} className='formErrorMessage mt-1'/>
    )
}

export const CustomFormSelect =
    ({
         label,
         placeholder,
         optionLabel = 'name',
         optionValue = 'id',
         ...props
    }) => {
    const [field] = useField(props);
    const options = props.options;

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select
                {...field}
                className='custom-input w-full text-black'
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(option => (
                    <option key={option[optionValue]} value={option[optionValue]}>
                        {option[optionLabel]}
                    </option>
                ))}
            </select>
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </>
    );
};

export const CustomFormSelectService = ({ label, optionLabel = 'name', optionValue = 'id', iconSrc, placeholder, onSelect, disabled, ...props }) => {
    const [field] = useField(props);
    const options = props.options;

    const handleSelect = (event) => {
        const selectedId = event.value;
        field.onChange(event);
        onSelect(selectedId);
    };

    return (
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <div>
                <Dropdown
                    {...field}
                    options={options}
                    optionLabel={optionLabel}
                    optionValue={optionValue}
                    className='w-full'
                    filter={!!props.filter}
                    placeholder={placeholder}
                    onChange={handleSelect}
                    disabled={disabled}
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage} />
        </div>
    );
};




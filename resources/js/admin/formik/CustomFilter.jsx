import {ErrorMessage, useField} from 'formik';
import {InputText} from "primereact/inputtext";
import {Message} from 'primereact/message';
import {Dropdown} from 'primereact/dropdown';

const CustomErrorMessage = ({children}) => {
    return (
        <Message severity="error" text={children} className='formErrorMessage mt-1'/>
    )
}

export const CustomInputFilter = ({ label, ...props }) => {
    return (
        <div style={{ position: 'relative', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <label htmlFor={props.id || props.name} style={{ marginRight: '0.5rem' }}>{label}</label>
            <div>
                <InputText {...props} className='w-full-filter' />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage} />
        </div>
    );
};

export const CustomSelectFilter = ({ label, optionLabel = 'name', optionValue = 'id', onSelect, placeholder, ...props }) => {
    const [field] = useField(props);
    const options = props.options;

    const handleSelect = (event) => {
        const selectedId = event.value;
        field.onChange(event);
        onSelect(selectedId);
    };

    return (
        <div style={{position: 'relative', marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
            <label htmlFor={props.id || props.name} style={{marginRight: '0.5rem'}}>{label}</label>
            <div>
                <Dropdown
                    {...field}
                    options={options}
                    optionLabel={optionLabel}
                    optionValue={optionValue}
                    className='w-full-filter'
                    filter={!!props.filter}
                    onChange={handleSelect}
                    placeholder={placeholder}
                />
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </div>

    );
};

export const CustomCalendarFilter = ({ label, optionLabel = 'name', optionValue = 'id', onSelect, ...props }) => {
    const [field] = useField(props);

    return (
        <div style={{position: 'relative', marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
            <label htmlFor={props.id || props.name} style={{marginRight: '0.5rem'}}>{label}</label>
            <div>
                <input
                    type="date"
                    {...field}
                    {...props}
                    className='searchField'
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        onSelect(selectedDate);
                    }}
                />
                {/*<img
                    src={'/assets/Administrador/icons/calendar.svg'}
                    alt="Search Icon"
                    className={'searchIcon'}
                />*/}
            </div>
            <ErrorMessage name={props.name} component={CustomErrorMessage}/>
        </div>
    );
};

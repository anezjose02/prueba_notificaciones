import PropTypes from 'prop-types';

export const StatCard = ({ text, value, color, id }) => {
    return (
        <div id={id} className="bg-gray-light p-3 rounded-4 h-100 d-flex flex-column">
            <p className='text-black font-semibold'>{text}</p>
            <small className='text-black'>Último mes</small>
            <h5 className='font-bold fs-4' style={{color}}>{value}</h5>
        </div>
    );
}

/*StatCard.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
    color: PropTypes.string,
}*/

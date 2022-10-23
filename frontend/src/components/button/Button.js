const Button = ({ onClick, label }) => {
    return (
        <button
            type='button'
            className='text-xs font-bold py-2 px-5 uppercase bg-blue-500 text-white rounded hover:opacity-75'
            onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;

import dot from '../../assets/svg/dot.svg';
const typeColors = {
    'mild': 'bg-green-500',
    'moderate': 'bg-amber-500',
    'severe': 'bg-red-500',
}

const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
}

const AlertCard = ({ onClick, data, isSelected = false }) => {
    let date = new Date(0);
    date.setUTCSeconds(data.timestamp);
    date = `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${addLeadingZeros(date.getDate(), 2)} ${addLeadingZeros(date.getHours(), 2)}:${addLeadingZeros(date.getMinutes(), 2)}:${addLeadingZeros(date.getSeconds(), 2)}`;
    let typeStyle = `text-xs text-white rounded-full px-3 pb-[2px] ${typeColors[data.type.toLowerCase()]}`;
    let cardStyle = `hover:opacity-75 hover:border-blue-500 bg-white w-full border rounded p-2 ${isSelected ? 'border-blue-500' : 'border-gray-300'}`;

    return (
        <button className={cardStyle} onClick={() => onClick(data.id)}>
            <div className='flex flex-wrap justify-between'>
                <div className='flex flex-wrap'>
                    {data.is_new ? (<img className='p-1' src={dot}></img>) : (<div className='px-2'></div>)}
                    <span className='text-xs'>ID #{data.id}</span>
                </div>
                <span className={typeStyle}>{data.type}</span>
            </div>
            <div className='flex pl-4 pt-2 font-semibold'>
                <span className='text-xs'>{data.reason}</span>
            </div>
            <div className='flex pl-4'>
                <span className='text-xs'>Detected at {date}</span>
            </div>
            <div className='flex py-1 pl-4'>
                <span className='text-xs text-blue-500'>{data.machine}</span>
            </div>
        </button>
        // <div>
        //     {date}
        // </div>
    )
}

export default AlertCard;
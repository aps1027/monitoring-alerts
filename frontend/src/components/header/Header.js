const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
}
const Header = ({ data }) => {
    let date = new Date(0);
    date.setUTCSeconds(data.timestamp);
    date = `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${addLeadingZeros(date.getDate(), 2)} ${addLeadingZeros(date.getHours(), 2)}:${addLeadingZeros(date.getMinutes(), 2)}:${addLeadingZeros(date.getSeconds(), 2)}`;
    return (
        <div className='border-b w-full px-4 pb-4'>
            <span className='text-lg font-medium'>
                Alert ID #{data.id}
            </span>
            <div>
                <span className='text-xs'>
                    Detected at {date}
                </span>
            </div>
        </div>
    );
};
export default Header;
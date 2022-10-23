import './DropDown.css';
const DropDown = ({ onChange, value, options, placeholder }) => {
  return (
    <div className='select-box'>
      <label>
        <select
          onChange={onChange}
          value={value}
          className='text-sm border border-gray-300 rounded py-1.5 pl-4 pr-8 w-full'>
          {placeholder ? <option value='' disabled>{placeholder}</option> : <></>}
          {
            options.map((option, idx) => {
              return <option key={idx} value={option.value}>{option.name}</option>
            })
          }
        </select>
      </label>
    </div>
  )
}
export default DropDown;
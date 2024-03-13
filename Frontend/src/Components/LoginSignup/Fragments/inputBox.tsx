

function InputBox(label:String, type:string, value: string, onChange : (event: React.ChangeEvent<HTMLInputElement>) => void ) {
  return (
    <div className='input'>
        <label>lable</label>
        <input type={type} value={value} className="form-control" />
    </div>
  );
}



export default InputBox;

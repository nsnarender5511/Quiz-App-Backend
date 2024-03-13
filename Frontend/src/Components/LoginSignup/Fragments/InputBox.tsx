import exp from 'constants';
import React,{useState} from 'react';


interface data {
    label: any;
    name: any;
    type: any;
    //value: any;
    data: any;
    onTypeHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;

}



const InputBox: React.FC<data> = ({label, name, type, data,onTypeHandle}) => {
  console.log(data);
  return (
    <div className='input'>
        <label>{label}</label>
        <input type={type} name={name} value={data.quizIdInput} onChange={onTypeHandle} className="form-control" />
    </div>
  );
}




// function InputBox(label:any, type:any, value: any, onChange : any ) {
//   return (
//     <div className='input'>
//         <label>lable</label>
//         <input type={type} value={value} className="form-control" />
//     </div>
//   );
// }



export default InputBox;
//export InputBox
import { useState } from "react"
import React  from 'react'
// import axios from 'axios'
// import {useNavigate} from 'react-router-dom'
// import Joy from 'joy' 
import Joi from 'joi';  
import './register.css'
function Register() {



// ====================== get data from user =====================
const [user ,setUser]=useState({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    confirm_password:'',
    phone:'',
    age:'',
    comunity:'',
    gender:''


});
const [isloading,setisloading]  =useState(false)
const [errorslist,setErrorslist]=useState([])



function getUserData(eventInfo){
    let myuser={...user};
    myuser[eventInfo.target.name] =eventInfo.target.value;
    setUser(myuser);
    // console.log(myuser); 
}

// =================================================================


// let navigate = useNavigate()
// const [error,setError]  =useState("")
// ======================  send data to API =====================
// async function sendAPI(){
//   let {data}=await  axios.post(``,user);
// console.log(data);
// if (data.message == 'success'){
    // login page
    // navigate('/login')
    // setisloading(true);
// }
// else{
//  setError(data.message)
// setisloading(true);
// }
// }

// =================================================================


function submetuser(e){
    e.preventDefault();
    setisloading(true);

   let validation= validatereg()

   if(validation.error){
       setisloading(false);
       setErrorslist(validation.error.details)
   }
   else{
    //    sendAPI();
   }
    // console.log(user);
    
}



// ============ Validations =================
function validatereg(){
    let schema = Joi.object({
    first_name:Joi.string().min(3).max(10).required(),
    last_name:Joi.string().min(3).max(10).required(),
    email:Joi.string().pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).required(),
    password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/).required(),
    confirm_password:Joi.string().equal(Joi.ref('password')).required(),
    phone:Joi.string().pattern(/^[0-9]{14}$/).required(),
    comunity:Joi.string().min(3).max(15).required(),
    age:Joi.date().required(),
    gender:Joi.string().required(),

});

     console.log(schema.validate(user ,{abortEarly: false}));
    //  validation conform password
    if(user.password!==user.confirm_password){
        return {error:{details:[{message:'Password and Confirm Password do not match'}]}};
    }
    

}












  return (<>


<div className='container text-center item-center  text-white fs-3 '>
<div className="position-relative ">
<div className="position-absolute top-50 start-50">
{errorslist.map((err,index)=>  <div key={index} className="alert alert-danger my-2">{err.message}</div>  )}

<form className="row bg-primary" onSubmit={submetuser}> 
<div className="col-12 " >
<div className="row">
<div className="col-6" >


    
<label htmlFor="first_name" >first name : </label>
<input onChange={getUserData}  type="text" name="first_name" className='form-control my-input my-2  ' id='first_name' placeholder="first name" />
</div>
<div className="col-6 " >

<label htmlFor="last_name">last name : </label>
<input onChange={getUserData} type="text" name="last_name" className='form-control my-input my-2 ' id='last_name' placeholder="last name" />
</div>
</div>
<label htmlFor="email">email : </label>
<input onChange={getUserData} type="email" name="email" className='form-control my-input my-2' id='email' placeholder="Email" />
<label htmlFor="password">password : </label>
<input onChange={getUserData} type="password" name="password" className='form-control my-input my-2'  placeholder="password"/>
<label htmlFor="confirm_password">confirm password : </label>
<input onChange={getUserData} type="password" name="confirm_password" className='form-control my-input my-2' id='confirm_password' placeholder="confirm password" />
<span>{errorslist.message}</span>
<label htmlFor="age">age : </label>
<input onChange={getUserData} type="date" name="age" className='form-control my-input my-2' id='age' />
<label htmlFor="phone">phone : </label>
<input onChange={getUserData} type="tel" name="phone" className='form-control my-input my-2' id='phone'  placeholder="phone"/>
<label htmlFor="comunity">comunity : </label>
<input onChange={getUserData} type="text" name="comunity" className='form-control my-input my-2' id='comunity' placeholder="comunity" />
<label htmlFor="gender">gender : </label>
<div className="fs-4 d-flex justify-content-around">
    <div>
<input onChange={getUserData} type="radio" name="gender" className=''  value={"male"}/>
<label for="gender">male</label>
</div>
<div>
<input onChange={getUserData} type="radio" name="gender" className='' value={"female"} />
<label for="gender">femal</label>
</div>
</div>
<div>

<button className="btn btn-success my-2 fs-2 "  type="submit"> {isloading == true?<i className="spinner-border text-warning " role="status"></i>:'Register'}</button>
</div>









</div>
</form>

</div>

</div>

</div>

</>
    )
}

export default Register
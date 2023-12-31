import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'



export default function () {

    const [credentials, setcredentials] = useState({name: "", email: "", password : "", geolocation : ""})
    let navigate = useNavigate()

    // const handleSubmit2 = async(e) => {
    //   navigate("/")
    // }

    const handleSubmit  = async (e) => {
        e.preventDefault()

        if(credentials.name.length < 5){
          alert("Name must be greater than or equal to 5 characters!!")
          return
        }

        const response = await fetch('https://gofoodbackend-sxvy.onrender.com/api/createuser',{
            method : 'Post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name:credentials.name , email:credentials.email, password:credentials.password, location:credentials.geolocation})
        })

        const json = await response.json()
        console.log(json)
        
        navigate("/login")
        // alert("User Created Successfully")

        if(!json.success){
            alert('Enter valid credentials')
        }

    }

    const onChange = (event) => {
        setcredentials({...credentials,[event.target.name] : event.target.value})
    }

    

  return (
    
    <>


    
    <div className='container'>
    <form onSubmit={handleSubmit}>

    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email}   onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password}  onChange={onChange} id="exampleInputPassword1"/>
  </div>

  <div className="mb-3">
    <label htmlFor="location" className="form-label">Location</label>
    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation}  onChange={onChange} />
  </div>
  
  <button type="submit" className="m-3 btn btn-success" >Submit</button>
  <Link to = '/login' className='m-3 btn btn-danger'>Already a user</Link>

</form>
</div>
    </>
  )
}

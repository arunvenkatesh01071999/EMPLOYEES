import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from 'react';
import './edit.css';
import Swal from 'sweetalert2';
export function Edit(){

    var usid=localStorage.getItem('usid');
    

const datasubmit = async(event)=>{
         event.preventDefault();
        
         const datastring = new FormData(event.target);
         const config = {headers:{'enctype':'multipart/form-data'}};

         
          await  axios.put('http://localhost:5000/updat',datastring,config)
            .then(function(res){
                if(res.data.status==='updated'){
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Your data has been updated',
                        showConfirmButton: false,
                        timer: 1500,
                      })
                      .then((result) => {
                        if (result) {
                          Swal.fire(
                            window.location.href="/"
                          )
                        }
                      })
                }
            })
            .catch(function(err){
                alert(err);
                window.location.reload();
            })
        }


        const [detail,setDetail] = useState([]);
       
        const Param=()=>usid    

        useEffect(()=>{
         axios.get(`http://localhost:5000/editview/${Param()}`)
            .then(function(res){
                setDetail(res.data);
            })     
        })
          
              
    return(
        <div>
         {detail.map((value,index)=>(       
            <div className="container ml-auto mr-auto mt-5 p-5 editback" key={index}>
            <h3>Edit Employee Details</h3>
            <form onSubmit={datasubmit}>
            <div className="row mt-5 col-lg-12">
                <div className="col-lg-6">
                <table>
                  <tbody>
                        <tr className="font-weight-bold">
                            
                            <td>First Name<input type="hidden" name="usid" id="usid" value={usid}/></td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="fname" id="fname" className="form-control" defaultValue={value.fname} required/></td>   
                        </tr>
                        <tr className="font-weight-bold">
                            <td>Email</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="email" name="email" id="email" className="form-control" defaultValue={value.email} required/></td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td>Education</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="education" id="education" className="form-control" defaultValue={value.education} required/></td>
                        </tr>
                       
                  </tbody>
                </table>
                
                </div>
                <div className="col-lg-6">
                <table>
                    <tbody>
                        <tr className="font-weight-bold">
                            <td>Last Name</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="lname" id="lname" className="form-control" defaultValue={value.lname} required/></td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td >DOB</td>
                            <td className="p-3">:</td>
                            <td className="p-3">  <input type="date" name="dob" id="dob" className="form-control" defaultValue={value.dob} required/></td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td>Location</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="location" id="location" className="form-control" defaultValue={value.location} required/></td>
                         </tr>
                    </tbody>
                </table>
                     
                </div>
                <div className="col-lg-12">
                        <div className='d-flex font-weight-bold'>
                           <div className='pt-3 pr-4'>About</div>
                           <div className='pt-3 pl-4 pr-4'> <p>:</p></div>
                           <div className='col-lg-9 pt-3'><textarea name="about" id="about" className="form-control" defaultValue={value.about} required></textarea></div>
                        </div>
                           <div className="p-5 update_btn"><button type="submit" name="submit" className="btn btn-dark">Update</button></div>
                
                </div>
                       
            </div>
            </form> 
                        
                </div>
                ))}
            </div>

        
    );
}
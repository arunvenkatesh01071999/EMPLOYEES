import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import './sms.css'

export function Details(){

const dataSubmit = async(event)=>{
         event.preventDefault();

         const datastring = new FormData(event.target);
         const config = {headers:{'enctype':'multipart/form-data'}};

         await axios.post('http://localhost:5000/details',datastring,config)
         .then(function(res){
            if(res.data.status === 'insert'){
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Your data has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  }) 
                  .then((result) => {
                    if (result) {
                      Swal.fire(
                        window.location.href="/"
                      )
                    }
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        })
        .catch(function(err){
            alert(err);
        })
}





    return(
        <div>
                
                
            <div className="container ml-auto mr-auto mt-5 p-5 smsback">
            <h3>Add Employee Details</h3>
            <form onSubmit={dataSubmit}>
            <div className="row mt-5 col-lg-12">
                <div className="col-lg-5">
                <table className=' font-weight-bold container' >
                  <tbody>
                        <tr>
                            <td>First Name</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="fname" id="fname" className="form-control" required/></td>   
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="email" name="email" id="email" className="form-control" required/></td>
                        </tr>
                        <tr>
                            <td>Education</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="education" id="education" className="form-control" required/></td>
                        </tr>
                       
                  </tbody>
                </table>
                </div>

                <div className='col-lg-2'></div>

                <div className="col-lg-5">
                <table className="font-weight-bold container">
                    <tbody>
                        <tr >
                            <td>Last Name</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="lname" id="lname" className="form-control" required/></td>
                        </tr>
                        <tr>
                            <td >DOB</td>
                            <td className="p-3">:</td>
                            <td className="p-3">  <input type="date" name="dob" id="dob" className="form-control" required/></td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="location" id="location" className="form-control" required/></td>
                         </tr>
                    </tbody>
                </table>
                     
                </div>
                <div className="col-lg-12">
                        <div className='d-flex font-weight-bold'>
                           <div className='pt-3 pr-4'>About</div>
                           <div className='pt-3 pl-4 pr-4'> <p>:</p></div>
                           <div className='col-lg-10 pt-3'><textarea name="about" id="about" className="form-control p-3" required></textarea></div>
                        </div>
                           <div className="p-5 update_btn"><button type="submit" name="submit" className="btn btn-dark">Submit</button></div>
                
                </div>
                       
            </div>
            </form> 
                        
                </div>
            </div>

        
    );
}
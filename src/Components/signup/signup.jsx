import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";



const Signup = () => {
    let { register, handleSubmit, formState: { errors }, watch } = useForm();
    let navigate = useNavigate();


    let [showPassword, setShowPassword] = useState(false);
    let [showCnfrmPassword, setShowCnfrmPassword] = useState(false);

    let TogglePassword = () => {
        setShowPassword((show) => !show)
    };
    let ToggleCnfrmPassword = () => {
        setShowCnfrmPassword((show) => !show)
    }


    let [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/getUsers').then((resp) => {
            console.log(resp.data);
            setUsers(resp.data)
        })
    }, []);
    const password = watch("password");
    let expressions = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validateEmail = (val) => {
        if (!val.match(expressions)) {
            return "Invalid Email";
        }
        let userExists = users.find((user) => {
            if (user.email == val) {
                return true;
            } else {
                return false;
            }
        });
        // console.log(userExists);
        if (userExists) {
            return "Email Already Exists"
        }

        return null;
    }



    const saveUser = (newUser) => {
        // console.log(newUser);
        let data = new FormData();

        data.append('userName', newUser.userName)
        data.append('email', newUser.email)
        data.append('password', newUser.password)

        axios.post('/createUser', data)

        let form = document.getElementById('form');
        form.reset();
        toast.success("Signup succesful")
        navigate('/login');

    }


    return <>
        <div class="bg-light py-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mb-0"><Link to="/">Home</Link> <span class="mx-2 mb-0">/</span> <strong class="text-black">SignUp</strong></div>
                </div>
            </div>
        </div>

        <section className="login_part padding_top">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_text text-center">
                            <div className="login_part_text_iner">
                                <h2>Already have an Account?</h2>
                                <p>
                                    There are advances being made in science and technology everyday,
                                    and a good example of this is the
                                </p>

                                <Link to="/login" className="btnCreate">
                                    Login
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_form">
                            <div className="login_part_form_iner">
                                <h3>
                                    Welcome! <br />
                                    Please Sign Up
                                </h3>
                                <form
                                    id="form"
                                    className="row contact_form"
                                    action="#"
                                    method="post"
                                    noValidate="novalidate"

                                    onSubmit={handleSubmit(saveUser)}
                                >
                                    <div className="col-md-12 form-group p_star">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="userName"
                                            defaultValue=""
                                            placeholder="Username"

                                            {...register('userName', { required: true })}
                                        />
                                    </div>
                                    {errors.userName && errors.userName.type == 'required' && <p className='errors'>Required</p>}
                                    <div className="col-md-12 form-group p_star">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            defaultValue=""
                                            placeholder="Email"


                                            {...register('email', {
                                                required: true, validate: validateEmail
                                            })}
                                        />
                                    </div>
                                    {errors.email && errors.email.type == 'required' && <p className='errors'>Required</p>}
                                    {errors.email && errors.email.type == 'validate' && <p className='errors'>{errors.email.message}</p>}
                                    <div className="col-md-12 form-group p_star">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            defaultValue=""
                                            placeholder="Password"

                                            {...register('password', {
                                                required: true,
                                            })}
                                        />
                                        <span onClick={TogglePassword}>{showPassword ? <BsEye /> : <BsEyeSlash />}</span>
                                    </div>
                                    {errors.password && errors.password.type == 'required' && <p className='errors'>Required</p>}
                                    <div className="col-md-12 form-group p_star">
                                        <input
                                            type={showCnfrmPassword ? "text" : "password"}
                                            className="form-control"
                                            id="cnfrnPassword"
                                            name="confirmPassword"
                                            defaultValue=""
                                            placeholder="Confirm Password"

                                            {...register('confirmPassword', {
                                                required: true, validate: (val) => val === password
                                            })}
                                        />
                                        <span onClick={ToggleCnfrmPassword}>{showCnfrmPassword ? <BsEye /> : <BsEyeSlash />}</span>
                                    </div>
                                    {errors.confirmPassword && errors.confirmPassword.type == 'required' && <p className='errors'>Required</p>}
                                    {errors.confirmPassword && errors.confirmPassword.type == 'validate' && <p className='errors'>Passowrd Doesn`t Match</p>}
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="btn_3">
                                            sign up
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
};


export default Signup;
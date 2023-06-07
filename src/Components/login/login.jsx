import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
    let navigate = useNavigate();
    let currUser = useSelector((store) => {
        // console.log(store);
        return store.currUserSection;
    });
    if (Object.keys(currUser).length != 0) {
        navigate("/")
    };

    let { register, handleSubmit, formState: { errors } } = useForm();

    let [showPassword, setShowPassword] = useState(false);

    let TogglePassword = () => {
        setShowPassword((show) => !show)
    };

    let dispatch = useDispatch();

    let [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/getUsers').then((resp) => {
            // console.log(resp.data);
            setUsers(resp.data)
        })
    }, []);


    const loginUser = (userData) => {

        axios.post('/userLogin', userData).then((resp) => {
            // console.log(resp.data);
            let userLogin = resp.data

            if (userLogin) {
                toast.success("Login Successful")
                let form = document.getElementById('form');
                let userFound = resp.data.userFound;
                localStorage.setItem('myToken', resp.data.myToken)
                dispatch({
                    type: 'userLogin',
                    payload: userFound
                })
                form.reset();
                if (userFound.type == 'Admin') {
                    navigate('/dashboard');

                } else {
                    navigate('/');

                }
            } else {
                toast.error("User Does not Exist")
            }
        })


    }



    return <>
        <div class="bg-light py-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 mb-0"><Link to="/">Home</Link> <span class="mx-2 mb-0">/</span> <strong class="text-black">Login</strong></div>
                </div>
            </div>
        </div>
        <section className="login_part padding_top">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_text text-center">
                            <div className="login_part_text_iner">
                                <h2>New to our Shop?</h2>
                                <p>
                                    There are advances being made in science and technology everyday,
                                    and a good example of this is the
                                </p>
                                <Link to="/signup" className="btnCreate">

                                    Create an Account

                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_form">
                            <div className="login_part_form_iner">
                                <h3>
                                    Welcome Back ! <br />
                                    Login Now
                                </h3>
                                <form
                                    id="form"
                                    className="row contact_form"
                                    action="#"
                                    method="post"
                                    noValidate="novalidate"
                                    onSubmit={handleSubmit(loginUser)}
                                >
                                    <div className="col-md-12 form-group p_star">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="email"
                                            defaultValue=""
                                            placeholder="Email"

                                            {...register('email', { required: true })}
                                        />
                                    </div>
                                    {errors.email && errors.email.type == 'required' && <p className='errors'>Required</p>}
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
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account d-flex align-items-center">
                                            {/* <input type="checkbox" id="f-option" name="selector" />
                                            <label htmlFor="f-option">Remember me</label> */}
                                        </div>
                                        <button type="submit" value="submit" className="btn_3">
                                            log in
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


export default Login;
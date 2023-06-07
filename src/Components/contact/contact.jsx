import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";



const Contact = () => {

    let { register, handleSubmit, formState: { errors } } = useForm();


    let sendMessage = (data) => {
        axios.post("/contactMessage", data).then((resp) => {
            console.log(resp.data);
            if (resp.data.success == true) {
                toast.success("Message Sent");
            }
        })
    }

    return <>
        <div className="bg-light py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-0">
                        <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>{" "}
                        <strong className="text-black">Contact</strong>
                    </div>
                </div>
            </div>
        </div>

        <div className="mapDiv">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.826155976324!2d73.0669452748093!3d31.418915452148998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922693afb58e5d1%3A0xe9385e0b5113adff!2sGamicaCloud%20(GCIT)!5e0!3m2!1sen!2s!4v1686057389932!5m2!1sen!2s"
                width="100%"
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
        <div className="site-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="h3 mb-3 text-black">Get In Touch</h2>
                    </div>
                    <div className="col-md-7">
                        <form onSubmit={handleSubmit(sendMessage)}>
                            <div className="p-3 p-lg-5 border">
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_fname" className="text-black">
                                            First Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="c_fname"
                                            name="c_fname"
                                            {...register('name', { required: true })}
                                        />
                                    </div>
                                    {errors.name && errors.name.type == 'required' && <p className='errors'>Required</p>}
                                    <div className="col-md-6">
                                        <label htmlFor="c_lname" className="text-black">
                                            Last Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="c_lname"
                                            name="c_lname"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_email" className="text-black">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="c_email"
                                            name="c_email"
                                            placeholder=""
                                            {...register('email', { required: true })}
                                        />
                                    </div>
                                    {errors.email && errors.email.type == 'required' && <p className='errors'>Required</p>}
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_subject" className="text-black">
                                            Subject{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="c_subject"
                                            name="c_subject"
                                            {...register('subject', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_message" className="text-black">
                                            Message{" "}
                                        </label>
                                        <textarea
                                            name="c_message"
                                            id="c_message"
                                            cols={30}
                                            rows={7}
                                            className="form-control"
                                            defaultValue={""}
                                            {...register('message', { required: true })}
                                        />
                                    </div>
                                    {errors.message && errors.message.type == 'required' && <p className='errors'>Required</p>}
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-12">
                                        <input
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-block"
                                            defaultValue="Send Message"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5 ml-auto">
                        <div className="p-4 border mb-3">
                            <span className="d-block text-primary h6 text-uppercase">
                                Gamica Cloud
                            </span>
                            <p className="mb-0">
                                Near Govt. College University ,Faisalabad , Pakistan
                            </p>
                        </div>
                        <div className="p-4 border mb-3">
                            <span className="d-block text-primary h6 text-uppercase">London</span>
                            <p className="mb-0">
                                203 Fake St. Mountain View, San Francisco, California, USA
                            </p>
                        </div>
                        <div className="p-4 border mb-3">
                            <span className="d-block text-primary h6 text-uppercase">Canada</span>
                            <p className="mb-0">
                                203 Fake St. Mountain View, San Francisco, California, USA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
};

export default Contact;
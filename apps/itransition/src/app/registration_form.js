import { useFormik } from "formik"
import * as Yup from "yup";
export default function Signup() {

    const formik = useFormik({
        initialValues:{
        firstName: "",
        lastName: "",
        email: "" 
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            console.log(JSON.stringify(values));
            fetch('http://localhost:4200/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            });
        }

    });
    return(
        <div>
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className="input_container">
            <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? <p>{formik.errors.firstName}</p> : null}
            </div>

            <div className="input_container">
            <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? <p>{formik.errors.lastName}</p> : null}
            </div>

            <div className="input_container">
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

<Signup />
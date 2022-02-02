import React from 'react';
import { useFormik } from 'formik';

function LogInForm( {login, error} ) {
    
    
    const validate = values => {
        const errors = {};
        if (!values.login) {
          errors.login = 'login is required';
        }
        if (!values.password) {
          errors.password = 'password is required';
        }
        return errors;
      };

    const formik = useFormik({
        initialValues: {
          login: '',
          password: '',
        },
        validate,
        onSubmit: values => {
          login(values.login, values.password);
        },
      });

    return(
        <form className='f-out' onSubmit={formik.handleSubmit}>
            <div className="f-in">
                <h2>Log in</h2>
                <div className='error-message'>
                    {error ? error : null}
                </div>
                
                <div htmlFor="login" className="form-group">
                    <label htmlFor="login">login:</label>
                    <input id="login" name="login" type="text" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.login}/>
                    {(formik.touched.login && formik.errors.login) ? <div>{formik.errors.login}</div> : null}
                </div>
                <div htmlFor="password" className="form-group">
                    <label htmlFor="password">password:</label>
                    <input id="password" name="password" type="password" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                    {(formik.touched.password && formik.errors.password) ? <div>{formik.errors.password}</div> : null}
                </div>
                <input type="submit" value="LOG IN"/>
            </div>
        </form>
    );
}

export default LogInForm;
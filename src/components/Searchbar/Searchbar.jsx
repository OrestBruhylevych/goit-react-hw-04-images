import { Formik, Form, Field } from 'formik';
 
export const Searchbar = ({onSubmit}) => {
    return (
<header className="searchbar">
            <Formik
                initialValues={{ name: '' }}
                onSubmit={values => {
                    console.log(values)
                    onSubmit(values);
                }}
            >
            <Form className="form">
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <Field
                    name='name'
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                 />
            </Form>
         </Formik>
</header>
    );
};

import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/App.css'; // Importing styles from App.css

const StudentForm = ({ onSubmit, editingStudent }) => {
  const initialValues = {
    name: '',
    age: '',
    class: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(2, 'Must be at least 2 characters'),
    age: Yup.number().required('Required').min(16, 'Must be at least 16').max(30, 'Must be less than 30'),
    class: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values, id: editingStudent ? editingStudent.id : Date.now() });
    resetForm();
  };

  useEffect(() => {
    if (editingStudent) {
      initialValues.name = editingStudent.name;
      initialValues.age = editingStudent.age;
      initialValues.class = editingStudent.class;
      initialValues.email = editingStudent.email;
    }
  }, [editingStudent]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      //enableReinitialize
    >
      {() => (
        <Form>
          <div>
            <label>Name</label>
            <Field name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label>Age</label>
            <Field name="age" type="number" />
            <ErrorMessage name="age" component="div" />
          </div>
          <div>
            <label>Class</label>
            <Field name="class" />
            <ErrorMessage name="class" component="div" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default StudentForm;

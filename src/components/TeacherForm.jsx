
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/App.css'; // Importing styles from App.css

const TeacherForm = ({ onSubmit, editingTeacher }) => {
  const initialValues = {
    name: '',
    subject: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(3, 'Must be at least 3 characters'),
    subject: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values, id: editingTeacher ? editingTeacher.id : Date.now() });
    resetForm();
  };

  useEffect(() => {
    if (editingTeacher) {
      initialValues.name = editingTeacher.name;
      initialValues.subject = editingTeacher.subject;
      initialValues.email = editingTeacher.email;
    }
  }, [editingTeacher]);

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
            <label>Subject</label>
            <Field name="subject" />
            <ErrorMessage name="subject" component="div" />
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

export default TeacherForm;

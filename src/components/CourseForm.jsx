
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/App.css'; // Importing styles from App.css

const CourseForm = ({ onSubmit, editingCourse }) => {
  const initialValues = {
    name: '',
    teacher: '',
    numberOfStudents: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    teacher: Yup.string().required('Required'),
    numberOfStudents: Yup.number().required('Required').positive('Must be a positive number'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values, id: editingCourse ? editingCourse.id : Date.now() });
    resetForm();
  };

  useEffect(() => {
    if (editingCourse) {
      initialValues.name = editingCourse.name;
      initialValues.teacher = editingCourse.teacher;
      initialValues.numberOfStudents = editingCourse.numberOfStudents;
    }
  }, [editingCourse]);

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
            <label>Course Name</label>
            <Field name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label>Teacher</label>
            <Field name="teacher" />
            <ErrorMessage name="teacher" component="div" />
          </div>
          <div>
            <label>Number of Students</label>
            <Field name="numberOfStudents" type="number" />
            <ErrorMessage name="numberOfStudents" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;

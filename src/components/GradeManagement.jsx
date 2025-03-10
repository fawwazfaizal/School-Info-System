import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/App.css"; // Importing styles

const GradeManagement = () => {
  const [grades, setGrades] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const gradeSchema = Yup.object().shape({
    name: Yup.string()
      .required("Student name is required")
      .min(2, "Name must be at least 2 characters"),
    subject: Yup.string()
      .required("Subject is required")
      .min(2, "Subject must be at least 2 characters"),
    grade: Yup.number()
      .required("Grade is required")
      .min(0, "Grade must be 0 or higher")
      .max(100, "Grade cannot exceed 100"),
  });

  const calculateLetterGrade = (score) => {
    if (score >= 90) return "A*";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    if (score >= 40) return "E";
    return "F";
  };

  const handleAddOrEditGrade = (values, { resetForm }) => {
    const letterGrade = calculateLetterGrade(values.grade);
    if (editIndex !== null) {
      // Update existing grade
      const updatedGrades = [...grades];
      updatedGrades[editIndex] = { ...values, letterGrade };
      setGrades(updatedGrades);
      setEditIndex(null);
    } else {
      // Add new grade
      setGrades([...grades, { ...values, letterGrade }]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedGrades = grades.filter((_, i) => i !== index);
    setGrades(updatedGrades);
  };

  //grademanagement for changing coding if needed for dashboard to the one has on div className

  return (
    <div 
      style={{ 
        backgroundImage: "url('https://wallpapers.com/images/hd/artistic-school-clipart-background-1uir61mblo42se8r.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        padding: '20px',
      }}
    >
      <div className="dashboard">     
        <h2>Grade Management</h2>
        <div className="form-container">
          <Formik
            initialValues={
              editIndex !== null
                ? grades[editIndex]
                : { name: "", subject: "", grade: "" }
            }
            validationSchema={gradeSchema}
            enableReinitialize
            onSubmit={handleAddOrEditGrade}
          >
            {() => (
              <Form>
                <label htmlFor="name">Student Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" component="div" className="error" />

                <label htmlFor="subject">Subject</label>
                <Field name="subject" type="text" />
                <ErrorMessage name="subject" component="div" className="error" />

                <label htmlFor="grade">Grade</label>
                <Field name="grade" type="number" />
                <ErrorMessage name="grade" component="div" className="error" />

                <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
              </Form>
            )}
          </Formik>
        </div>

        <h3>Grades List</h3>
        {grades.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Subject</th>
                <th>Numeric Grade</th>
                <th>Letter Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.name}</td>
                  <td>{grade.subject}</td>
                  <td>{grade.grade}</td>
                  <td>{grade.letterGrade}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No grades added yet.</p>
        )}
      </div>
    </div>
  );
};

export default GradeManagement;
 
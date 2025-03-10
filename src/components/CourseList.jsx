
import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import '../styles/App.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setEditingCourse(null);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleSubmit = (course) => {
    if (editingCourse) {
      updateCourse(course);
    } else {
      addCourse(course);
    }
  };

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
      <div className="course-list-container">
        <h2>Course List</h2>
        <div className="form-container">
          <CourseForm 
            onSubmit={handleSubmit} 
            editingCourse={editingCourse}
            onCancel={() => setEditingCourse(null)}
          />
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Teacher</th>
                <th>Number of Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td>{course.numberOfStudents}</td>
                  <td className="actions">
                    <button 
                      onClick={() => setEditingCourse(course)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteCourse(course.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseList;

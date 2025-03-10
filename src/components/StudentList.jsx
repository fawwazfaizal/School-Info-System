
import React, { useState } from 'react';
import StudentForm from './StudentForm';
import { useSchool } from '../context/SchoolContext';
import '../styles/App.css';

const StudentList = () => {
  const [editingStudent, setEditingStudent] = useState(null);
  const { students, addStudent, updateStudent, deleteStudent } = useSchool();

  const handleSubmit = (student) => {
    if (editingStudent) {
      updateStudent(student);
      setEditingStudent(null);
    } else {
      addStudent(student);
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
      <div className="student-list-container">
        <h2>Student List</h2>
        <div className="form-container">
          <StudentForm 
            onSubmit={handleSubmit} 
            editingStudent={editingStudent} 
            onCancel={() => setEditingStudent(null)}
          />
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Class</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>{student.email}</td>
                  <td className="actions">
                    <button 
                      onClick={() => setEditingStudent(student)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteStudent(student.id)}
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

export default StudentList;

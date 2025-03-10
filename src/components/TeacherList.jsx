
import React, { useState, useEffect } from 'react';
import TeacherForm from './TeacherForm';
import '../styles/App.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
      setTeachers(JSON.parse(savedTeachers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);

  const addTeacher = (teacher) => {
    setTeachers([...teachers, teacher]);
  };

  const updateTeacher = (updatedTeacher) => {
    setTeachers(teachers.map(teacher =>
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    ));
    setEditingTeacher(null);
  };

  const deleteTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const handleSubmit = (teacher) => {
    if (editingTeacher) {
      updateTeacher(teacher);
    } else {
      addTeacher(teacher);
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
      <div className="teacher-list-container">
        <h2>Teacher List</h2>
        <div className="form-container">
          <TeacherForm 
            onSubmit={handleSubmit} 
            editingTeacher={editingTeacher}
            onCancel={() => setEditingTeacher(null)}
          />
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.email}</td>
                  <td className="actions">
                    <button 
                      onClick={() => setEditingTeacher(teacher)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteTeacher(teacher.id)}
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

export default TeacherList;

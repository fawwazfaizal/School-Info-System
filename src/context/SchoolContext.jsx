// src/context/SchoolContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data when app starts
  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      const savedTeachers = localStorage.getItem('teachers');
      const savedCourses = localStorage.getItem('courses');
      const savedGrades = localStorage.getItem('grades');

      setStudents(savedStudents ? JSON.parse(savedStudents) : []);
      setTeachers(savedTeachers ? JSON.parse(savedTeachers) : []);
      setCourses(savedCourses ? JSON.parse(savedCourses) : []);
      setGrades(savedGrades ? JSON.parse(savedGrades) : []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('students', JSON.stringify(students));
      localStorage.setItem('teachers', JSON.stringify(teachers));
      localStorage.setItem('courses', JSON.stringify(courses));
      localStorage.setItem('grades', JSON.stringify(grades));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [students, teachers, courses, grades]);

  // Student operations
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Teacher operations
  const addTeacher = (teacher) => {
    setTeachers([...teachers, { ...teacher, id: Date.now() }]);
  };

  const updateTeacher = (updatedTeacher) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    ));
  };

  const deleteTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  // Course operations
  const addCourse = (course) => {
    setCourses([...courses, { ...course, id: Date.now() }]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // Grade operations
  const addGrade = (grade) => {
    setGrades([...grades, { ...grade, id: Date.now() }]);
  };

  const updateGrade = (updatedGrade) => {
    setGrades(grades.map(grade => 
      grade.id === updatedGrade.id ? updatedGrade : grade
    ));
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter(grade => grade.id !== id));
  };

  // Stats calculations for dashboard
  const getStats = () => ({
    totalStudents: students.length,
    totalTeachers: teachers.length,
    totalCourses: courses.length,
    averageGrade: grades.length 
      ? (grades.reduce((acc, curr) => acc + Number(curr.grade), 0) / grades.length).toFixed(1)
      : 0
  });

  return (
    <SchoolContext.Provider value={{
      // State
      students,
      teachers,
      courses,
      grades,
      loading,

      // Student operations
      addStudent,
      updateStudent,
      deleteStudent,

      // Teacher operations
      addTeacher,
      updateTeacher,
      deleteTeacher,

      // Course operations
      addCourse,
      updateCourse,
      deleteCourse,

      // Grade operations
      addGrade,
      updateGrade,
      deleteGrade,

      // Stats
      getStats
    }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

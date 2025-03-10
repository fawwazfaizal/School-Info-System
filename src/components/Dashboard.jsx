import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
  });

  // Example announcements
  const announcements = [
    { id: 1, title: "End of Semester Exams", date: "2026-02-01" },
    { id: 2, title: "Teacher Conference Day", date: "2025-07-15" },
    { id: 3, title: "Spring Break", date: "2025-04-01 to 2025-04-14" },
    { id: 4, title: "Summer Vacation", date: "2025-07-18 to 2025-08-29" },
  ];

  return (
    <div style = {{ backgroundImage: "url('https://wallpapers.com/images/hd/artistic-school-clipart-background-1uir61mblo42se8r.jpg')", 
        backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', padding: '20px',
      }}
    >
      <div className="dashboard">
        <h2>School Dashboard</h2>

        {/* Statistics Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Students</h3>
            <p className="stat-number">{stats.totalStudents}</p>
          </div>
          <div className="stat-card">
            <h3>Teachers</h3>
            <p className="stat-number">{stats.totalTeachers}</p>
          </div>
          <div className="stat-card">
            <h3>Courses</h3>
            <p className="stat-number">{stats.totalCourses}</p>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="announcements-section">
          <h3>Recent Announcements</h3>
          <div className="announcements-list">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="announcement-card">
                <h4>{announcement.title}</h4>
                <p>Date: {announcement.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button onClick={() => (window.location.href = '/students')}>
              Manage Students
            </button>
            <button onClick={() => (window.location.href = '/teachers')}>
              Manage Teachers
            </button>
            <button onClick={() => (window.location.href = '/courses')}>
              Manage Courses
            </button>
            <button onClick={() => (window.location.href = '/grades')}>
              Manage Grades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

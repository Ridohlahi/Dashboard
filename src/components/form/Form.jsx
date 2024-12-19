import { useCreateStudentMutation } from '../../feature/studentslice/studentApiSlice';
import { useState } from 'react';
import '../form/Form.css'
import React from 'react';

const Form = () => {
  const [addStudent] = useCreateStudentMutation();
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    phone_number: '',
    email_address: '',
    course_you_would_like_to_take: '',
    level_of_experience: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      studentData.first_name.trim() &&
      studentData.last_name.trim() &&
      studentData.gender.trim() &&
      studentData.phone_number.trim() &&
      studentData.email_address.trim() &&
      studentData.course_you_would_like_to_take.trim() &&
      studentData.level_of_experience.trim()
    ) {
      try {
        await addStudent(studentData);
        setStudentData({ first_name: '', last_name: '', gender: '', phone_number: '', email_address:"", course_you_would_like_to_take: '', level_of_experience: '' });
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to add student', error);
      }
    }
  };

  return (
    <div>
      <div className="form-student">
        <form onSubmit={handleSubmit}>
          <div className="studentdv">
            <div className="first-name">
              <input
                className="pad"
                type="text"
                placeholder="Enter First Name"
                value={studentData.first_name}
                onChange={(e) =>
                  setStudentData({ ...studentData, first_name: e.target.value })
                }
              />
            </div>

            <div className="last-name">
              <input
                className="pad"
                type="text"
                placeholder="Enter Last Name"
                value={studentData.last_name}
                onChange={(e) =>
                  setStudentData({ ...studentData, last_name: e.target.value })
                }
              />
            </div>

            <div className="gender">
              <input
                className="pad"
                type="text"
                placeholder="Enter Gender"
                value={studentData.gender}
                onChange={(e) =>
                  setStudentData({ ...studentData, gender: e.target.value })
                }
              />
            </div>
            
            <div className="phone-number">
              <input
                className="pad"
                type="text"
                placeholder="Enter Phone Number"
                value={studentData.phone_number}
                onChange={(e) =>
                  setStudentData({ ...studentData, phone_number: e.target.value })
                }
              />
            </div>

            <div className="email">
              <input
                className="pad"
                type="text"
                placeholder="Enter Email Address"
                value={studentData.email_address}
                onChange={(e) =>
                  setStudentData({ ...studentData, email_address: e.target.value })
                }
              />
            </div>

            <div className="course">
              <input
                className="pad"
                type="text"
                placeholder="Course You Would Like to Take"
                value={studentData.course_you_would_like_to_take}
                onChange={(e) =>
                  setStudentData({ ...studentData, course_you_would_like_to_take: e.target.value })
                }
              />
            </div>

            <div className="level-of-experience">
              <input
                className="pad"
                type="text"
                placeholder="Enter Level of Experience"
                value={studentData.level_of_experience}
                onChange={(e) =>
                  setStudentData({ ...studentData, level_of_experience: e.target.value })
                }
              />
            </div>

            <button type="submit">
              {isEditing ? 'Update Student' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

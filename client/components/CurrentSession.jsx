import React from 'react'
import Form from './Form'
import { useSelector } from 'react-redux'

export default function CurrentSession() {
  let formData = useSelector((state) => state.currentFormData)

  //This is place holder do getting some information from the last session and new Date()
  //until I work out how I will make it interact with a calendar libaray
  const oldSessionData = useSelector((state) => state.lastFormData)
  formData = {
    ...formData,
    date: new Date().toISOString().slice(2, 10),
    hour: new Date().toISOString().slice(11, 16),
    name: oldSessionData.name,
    teacherId: oldSessionData.teacher_id,
    studentId: oldSessionData.student_id,
  }
  return (
    <>
      <h1>Current Session:</h1>
      <h2>
        {`Notes for ${formData.name} at ${formData.hour} on the ${formData.date}`}
      </h2>
      <div className="formContainer">
        <div className="studentNotes">
          <Form
            title="Student Notes"
            formName="studentNotes"
            state={formData}
            value={formData.studentNotes}
            buttonBool={true}
            onChangeBool={true}
          />
          <br></br>
        </div>
        <div className="teacherNotes">
          <Form
            title="Teacher Notes"
            formName="teacherNotes"
            state={formData}
            value={formData.teacherNotes}
            buttonBool={false}
            onChangeBool={true}
          />
        </div>
      </div>
    </>
  )
}

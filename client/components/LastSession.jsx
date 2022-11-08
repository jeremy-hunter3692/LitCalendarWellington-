import React from 'react'
import { useSelector } from 'react-redux'
import Form from './Form'
export default function LastSession() {
  const formData = useSelector((state) => state.lastFormData)

  return (
    <>
      <h1>Last Session: </h1>
      <h2>{`Notes for ${formData.name} at ${formData.hour} on the ${formData.date}`}</h2>
      <div className="formContainer">
        <div className="studentNotes">
          <Form
            title="Student Notes"
            formName="studentNotes"
            state={formData}
            value={formData.studentNotes}
            buttonBool={false}
            onChangeBool={false}
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
            onChangeBool={false}
          />
        </div>
      </div>
    </>
  )
}

import { useState } from 'react';
import HStack from '../components/HStack';
import TextField from '../components/TextField';
import PillButton from '../components/PillButton';
import CircularButton from '../components/CircularButton';
import styled from 'styled-components';
import Course from '../classes/Course';
import Assessment from '../classes/Assessment';

import trashSign from '../icons/trash-white.png'

const EditCourse = ({ course, addCourse }) => {
  const editing = course != null;
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [assignments, setAssignments] = useState([]);

  const addAssignment = () => {
    setAssignments([...assignments, { name: '', weight: 0 }]);
  };

  function onConfirm() {
    const newCourse = new Course(courseName, courseCode);
    addCourse(newCourse);
  }


  return (
    <div>
        <h2>{courseName.length === 0 ? "New Course" : courseName}</h2>
        <h6>{courseCode.length === 0 ? "No code" : courseCode}</h6>
        <hr/>
        <WithMargin>
          <TextField value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Name"></TextField>
        </WithMargin>
        <WithMargin>
          <TextField value={courseCode} onChange={(e) => setCourseCode(e.target.value)} placeholder="Code"></TextField>
        </WithMargin>
        <WithMargin>
          <PillButton text={editing ? "Confirm Changes" : "Add course"} backgroundColor="#378f54" textColor="white" onClick={onConfirm}/>
        </WithMargin>







        <div>
            <HStack>
              <h4>Assignments</h4>
              <PillButton text="Add assignment" backgroundColor="#4ea0d9" textColor="white" onClick={(e) => addAssignment()}/>
            </HStack>
            <hr />
            {assignments.map((assignment, index) => (
              <div key={index} style={{margin: '10pt'}}>
                <HStack>
                    {/* <TextField value={assignment.name} onChange={(e) => updateAssignment(index, 'name', e.target.value)} placeholder="Assignment"></TextField>
                    <TextField value={assignment.weight} onChange={(e) => updateAssignment(index, 'weight', e.target.value)} placeholder="Assignment"></TextField> */}
                    <CircularButton src={trashSign} color="#ff5136" size="40px" onClick={() => {}}/>
                </HStack>
              </div>
            ))}
        </div>
    </div>
  );
};


const WithMargin = styled.div`
  margin: 10pt;
`;

export default EditCourse;


// onChange={(e) => updateAssignment(index, 'weight', e.target.value)}
// />
// <button type="button" onClick={() => removeAssignment(index)}>Remove</button>
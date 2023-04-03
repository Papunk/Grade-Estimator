import { useState } from 'react';
import HStack from './components/HStack';
import TextField from './components/TextField';
import PillButton from './components/PillButton';
import CircularButton from './components/CircularButton';

import trashSign from './icons/trash-white@2x.png'

const AddCourse = ({ getCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [assignments, setAssignments] = useState([]);

  const addAssignment = () => {
    setAssignments([...assignments, { name: '', weight: 0 }]);
  };

  const removeAssignment = (index) => {
    const newAssignments = [...assignments];
    newAssignments.splice(index, 1);
    setAssignments(newAssignments);
  };

  const updateAssignment = (index, field, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
  };



  return (
    <div>
        <h2>{courseName.length === 0 ? "New Course" : courseName}</h2>
        <hr />
        <TextField value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Course Name"></TextField>
        <div>
            <h4>Assignments</h4>
            <hr />
            {assignments.map((assignment, index) => (
              <div key={index} style={{margin: '10pt'}}>
                <HStack>
                    <TextField value={assignment.name} onChange={(e) => updateAssignment(index, 'name', e.target.value)} placeholder="Assignment"></TextField>
                    <CircularButton src={trashSign} color="#ff5136" size="40px" onClick={() => {}}/>
                </HStack>
              </div>
            ))}
            <PillButton text="Add assignment" backgroundColor="#4ea0d9" textColor="white" onClick={(e) => addAssignment()}/>
        </div>
    </div>
  );
};

export default AddCourse;


// onChange={(e) => updateAssignment(index, 'weight', e.target.value)}
// />
// <button type="button" onClick={() => removeAssignment(index)}>Remove</button>
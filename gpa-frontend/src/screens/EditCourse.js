import { useState } from 'react';
import HStack from '../components/HStack';
import TextField from '../components/TextField';
import PillButton from '../components/PillButton';
import CircularButton from '../components/CircularButton';
import styled from 'styled-components';
import Course from '../classes/Course';
import Assessment from '../classes/Assessment';

import trashSign from '../icons/trash.png';
import addList from '../icons/add-list.png';

import Title from '../components/Title';
import Subtitle from '../components/Subtitle';


const EditCourse = ({ course, addCourse }) => {
  const editing = course != null;
  const [courseName, setCourseName] = useState(course ? course.name : "");
  const [courseCode, setCourseCode] = useState(course ? course.code : "");
  const [assessments, setAssessments] = useState(course ? course.assessments : []);

  function addEmptyAssignment() {
    const newAssessment = new Assessment("", 0)
    setAssessments([...assessments, newAssessment])
  };

  const modifyAssessmentAtIndex = (index, name, weight) => {
    setAssessments(prevAssessments => {
      const newAssessments = [...prevAssessments];
      const assessment = newAssessments[index];
      if (name !== null) {
        assessment.name = name;
      }
      if (weight !== null) {
        assessment.weight = weight;
      }
      return newAssessments;
    });
  };

  function onConfirm() {
    if (courseName.length > 0) {
      const newCourse = new Course(courseName, courseCode, course ? course.id : null);
      for (const elem of assessments) {
        newCourse.addAssessment(elem);
      }
      addCourse(newCourse);
    }
  }


  return (
    <div>
        <WithMargin>
          <Title>
            <CustomTextField type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Name"/>
          </Title>
        </WithMargin>
        <WithMargin>
          <Subtitle>
            <CustomTextField type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} placeholder="Code"/>
          </Subtitle>
        </WithMargin> 
  
        <div>
            <HStack>
              <Subtitle>Assessments</Subtitle>
              <CircularButton color="#4ea0d9" onClick={() => addEmptyAssignment()}>
                <img src={addList} width="20" height="20"/>
              </CircularButton>
            </HStack>
            <hr/>
            {assessments.map((assessment, index) => (
              <div key={index} style={{margin: '10pt'}}>
                  <AssignmentRowText>
                    <HStack>
                      <CustomTextField type="text" value={assessment.name} onChange={(e) => modifyAssessmentAtIndex(index, e.target.value, null)} placeholder="Assignment"/>
                      <CustomTextField type="number" value={assessment.weight} onChange={(e) => modifyAssessmentAtIndex(index, null, e.target.value)} placeholder="Assignment"/>
                      <CircularButton color="#ff5136" onClick={null}>
                        <img src={trashSign} width="20" height="20"/>
                      </CircularButton>
                    </HStack>
                  </AssignmentRowText>
              </div>
            ))}
        </div>

        <WithMargin>
          <PillButton text={editing ? "Confirm Changes" : "Add course"} backgroundColor="#378f54" textColor="white" onClick={onConfirm}/>
        </WithMargin>


    </div>
  );
};



const CustomTextField = styled.input`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  outline: none;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  color: inherit;
  text-align: inherit;
`;

const AssignmentRowText = styled.div`
  text-align: left;
`;


const WithMargin = styled.div`
  margin: 10pt 0pt 10pt 0pt;
`;

export default EditCourse;


// onChange={(e) => updateAssignment(index, 'weight', e.target.value)}
// />
// <button type="button" onClick={() => removeAssignment(index)}>Remove</button>
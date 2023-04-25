import { useState } from 'react';
import styled from 'styled-components';
import Assessment from '../classes/Assessment';
import Course from '../classes/Course';
import CircularButton from '../components/CircularButton';
import EditableTextField from '../components/EditableTextfield';
import HStack from '../components/HStack';
import PillButton from '../components/PillButton';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import addList from '../icons/add-list.png';
import trashSign from '../icons/trash.png';


const EditCourse = ({ course, modifyCourses }) => {
  const [courseName, setCourseName] = useState(course ? course.name : "");
  const [courseCode, setCourseCode] = useState(course ? course.code : "");
  const [assessments, setAssessments] = useState(course ? course.assessments : []);

  function addEmptyAssignment() {
    const newAssessment = new Assessment("", 0)
    setAssessments([...assessments, newAssessment])
  };

  const modifyAssessmentAtIndex = (index, name, grade, weight) => {
    setAssessments(prevAssessments => {
      const newAssessments = [...prevAssessments];
      const assessment = newAssessments[index];
      if (name !== null) {
        assessment.name = name;
      }
      if (grade !== null) {
        assessment.grade = parseFloat(grade);
      }
      if (weight !== null) {
        assessment.weight = parseFloat(weight);
      }
      return newAssessments;
    });
  };

  function onConfirm() {
    if (courseName.length > 0) {
      var newCourse = new Course(courseName, courseCode, course ? course.id : null);
      for (const elem of assessments) {
        newCourse.addAssessment(elem);
      }
      modifyCourses(newCourse);
    }
  }

  function deleteCourse() {
    modifyCourses(course.id);
  }

  function deleteAssessment(index) {
    const newAssessments = assessments.filter((_, i) => i !== index)
    setAssessments(newAssessments);
  }


  return (
    <div>
        <WithMargin>
          <Title>
            <EditableTextField type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Name"/>
          </Title>
        </WithMargin>
        <WithMargin>
          <Subtitle>
            <EditableTextField type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} placeholder="Code"/>
          </Subtitle>
        </WithMargin> 
  

        <div>
            <HStack>
              <Subtitle>Assessments</Subtitle>
              <CircularButton color="#4ea0d9" onClick={() => addEmptyAssignment()}>
                <img alt="add assessment" src={addList} width="20" height="20"/>
              </CircularButton>
            </HStack>
            <hr/>
            {assessments.map((assessment, index) => (
              <div key={index} style={{margin: '10pt'}}>
                  <AssignmentRowText>
                    <HStack>
                      <EditableTextField type="text" value={assessment.name} onChange={(e) => modifyAssessmentAtIndex(index, e.target.value, null, null)} placeholder="Name"/>
                      <EditableTextField type="number" min="0" max="100" step="5" value={assessment.grade} onChange={(e) => modifyAssessmentAtIndex(index, null, e.target.value, null)} placeholder="Obtained"/>
                      <EditableTextField type="number" min="0" max="100" step="5" value={assessment.weight} onChange={(e) => modifyAssessmentAtIndex(index, null, null, e.target.value)} placeholder="Value"/>
                      <CircularButton color="#ff6b60" onClick={() => deleteAssessment(index)}>
                        <img alt="delete assessment" src={trashSign} width="20" height="20"/>
                      </CircularButton>
                    </HStack>
                  </AssignmentRowText>
              </div>
            ))}

            {
            course !== null ?
            <div>
              <HStack>
                <Subtitle>Course Metrics</Subtitle>
              </HStack>
              <hr/>
              <div>
                <MetricsText>Total Percentage: {
                  course.assessments.length > 0 ?
                  course.assessments.reduce((accumulator, currentValue) => parseFloat(accumulator ? accumulator : 0) + parseFloat(currentValue.weight ? currentValue.weight : 0), 0)
                  : 0
                }%</MetricsText>
                <MetricsText>Current Grade: {
                  course.assessments.length > 0 ?
                  course.assessments.reduce((accumulator, currentValue) => parseFloat(accumulator ? accumulator : 0) + parseFloat(currentValue.grade ? currentValue.grade : 0), 0)
                  : 0
                }%</MetricsText>
              </div>
            </div>
            : null
          }
        </div>


        {
          course === null ?
          <WithMargin>
            <PillButton text={"Add Course"} backgroundColor="#378f54" textColor="white" onClick={onConfirm}/>
          </WithMargin>
          :
          <HStack>
            <WithMargin>
              <PillButton text={"Delete Course"} backgroundColor="#ff6b60" textColor="white" onClick={deleteCourse}/>
            </WithMargin>
            <WithMargin>
              <PillButton text={"Done"} backgroundColor="#378f54" textColor="white" onClick={onConfirm}/>
            </WithMargin>
          </HStack>
        }


    </div>
  );
};

const MetricsText = styled.div`
  text-align: left;
  font-size: 14pt;
  font-weight: bold;
  margin: 10pt 0pt 0pt 0pt;
`;

const AssignmentRowText = styled.div`
  text-align: left;
`;


const WithMargin = styled.div`
  margin: 30pt 0pt 10pt 0pt;
`;

export default EditCourse;


// onChange={(e) => updateAssignment(index, 'weight', e.target.value)}
// />
// <button type="button" onClick={() => removeAssignment(index)}>Remove</button>
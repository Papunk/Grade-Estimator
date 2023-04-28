import { useState } from 'react';
import styled from 'styled-components';
import Assessment from '../classes/Assessment';
import Course from '../classes/Course';
import CircularButton from '../components/CircularButton';
import EditableTextField from '../components/EditableTextfield';
import TextField from '../components/TextField';
import HStack from '../components/HStack';
import PillButton from '../components/PillButton';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import addList from '../icons/add-list.png';
import trashSign from '../icons/trash.png';


const EditCourse = ({ course, modifyCourses }) => {

  const [courseName, setCourseName] = useState(course ? course.name : "");
  const [courseCode, setCourseCode] = useState(course ? course.code : "");
  const [credits, setCourseCredits] = useState(course ? course.credits : null);
  const [assessments, setAssessments] = useState(course ? course.assessments : []);

  function addEmptyAssignment() {
    const newAssessment = new Assessment("")
    setAssessments([...assessments, newAssessment])
  };

  const modifyAssessmentAtIndex = (index, name, score, maxScore, weight) => {
    setAssessments(prevAssessments => {
      const newAssessments = [...prevAssessments];
      const assessment = newAssessments[index];
      if (name !== null) {
        assessment.name = name;
      }
      if (score !== null) {
        assessment.score = parseFloat(score);
      }
      if (maxScore !== null) {
        assessment.maxScore = parseFloat(maxScore);
      }
      if (weight !== null) {
        assessment.weight = parseFloat(weight);
      }
      return newAssessments;
    });
  };

  function onConfirm() {
    if (courseName.length > 0) {
      var newCourse = new Course(courseName, courseCode, course ? course.id : null, credits);
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
            {/* <EditableTextField type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Name"/> */}
          </Title>
        </WithMargin>
        <WithMargin>
          <Subtitle>
            <EditableTextField type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Name    "/>
            <EditableTextField type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} placeholder="Code     "/>
            <EditableTextField type="number" min="1" max="4" step="1" value={credits} onChange={(e) => setCourseCredits(e.target.value)} placeholder="Credits"/>
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
                      <EditableTextField type="text" value={assessment.name} onChange={(e) => modifyAssessmentAtIndex(index, e.target.value, assessment.score, assessment.maxScore, assessment.weight)} placeholder="Name"/>
                      <EditableTextField type="number" min="0" max="100" step="1" value={assessment.score} onChange={(e) => modifyAssessmentAtIndex(index, assessment.name, e.target.value, assessment.maxScore, assessment.weight)} placeholder="Obtained"/>
                      <EditableTextField type="number" min="0" max="100" step="1" value={assessment.maxScore} onChange={(e) => modifyAssessmentAtIndex(index, assessment.name, assessment.score, e.target.value, assessment.weight)} placeholder="Value"/>
                      <EditableTextField type="number" min="0" max="100" step="1" value={assessment.weight} onChange={(e) => modifyAssessmentAtIndex(index, assessment.name, assessment.score, assessment.maxScore, e.target.value)} placeholder="Weight"/>
                      <TextField value={Number(assessment.grade()) ? assessment.grade() + '%' : 0} placeholder="Grade" width={'5em'}></TextField>
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
                <MetricsText>Maximum Grade Possible: {course.maxGrade()}%</MetricsText>
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
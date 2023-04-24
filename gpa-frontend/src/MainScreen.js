import React, { useState } from 'react';
import EditCourse from './screens/EditCourse';
import CircularButton from './components/CircularButton';
import ExpandableModal from './components/ExpandableModal';
import HStack from './components/HStack';
import styled from 'styled-components';

import chevronRight from './icons/chevron-right.png'
import calendar from './icons/calendar.png'
import pencil from './icons/pencil.png'

import Course from './classes/Course';

import Title from './components/Title'
import Subtitle from './components/Subtitle'

import plusSign from './icons/plus-white.png';


function GradeTracker() {
  const [currentSemester, setCurrentSemester] = useState("Spring 2023");

  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [currentCourse, setCurrentCourse] = useState(null);
  const [addingCourse, setAddingCourse] = useState(false);

  function handleAddCourse(newCourse) {
    setCurrentCourse(null);
    setAddingCourse(false);
    setCourses([...courses, newCourse]);
  }

  function handleEditCourse(updatedCourse) {
    setCurrentCourse(null);
    setAddingCourse(false);
    const updatedCourseList = [];
    for (const elem of courses) {
      if (elem.id === updatedCourse.id) {
        updatedCourseList.push(updatedCourse);
      }
      else {
        updatedCourseList.push(elem);
      }
    }
    setCourses(updatedCourseList);
  }

  function editCourse(course) {
    setAddingCourse(() => true);
    setCurrentCourse(() => course);
  }

  function stopEditing() {
    setCurrentCourse(null);
    setAddingCourse(false);
  }

  
  const handleSelection = (event) => {
    setCurrentSemester(event.target.value);
  }



  return (
    <Container>
      <Title>Grade Tracker</Title>
      <hr/>
      <div>
        <HStack>
          <Subtitle>{currentSemester}</Subtitle>
          <HStack>
            <CircularButton color="#db7f01" onClick={null}>
              <img src={calendar} width="20" height="20"/>
            </CircularButton>
            <CircularButton color="#4ea0d9" onClick={() => setAddingCourse(true)}>
              <img src={plusSign} width="20" height="20"/>
            </CircularButton>
          </HStack>
        </HStack>
        {courses.map((course, index) => (
          <div key={index}>
            <ClassRow>
              <HStack>
                <div>
                  <ClassTitle>{course.name}</ClassTitle>
                  <ClassSubtitle>{course.code}</ClassSubtitle>
                </div>
                <CircularButton color="#283247" onClick={() => editCourse(course)}>
                  <img src={chevronRight} width="20" height="20"/>
                </CircularButton>
              </HStack>
            </ClassRow>
          </div>
        ))}

      </div>

      {
        addingCourse ?
        <ExpandableModal onClose={stopEditing}>
          <EditCourse course={currentCourse} addCourse={currentCourse ? handleEditCourse : handleAddCourse}></EditCourse>
        </ExpandableModal> : null
      }

    </Container>
  );
}


const Container = styled.div`
  width: 40%;
  max-width: 500pt;
  min-width: 300pt;
  padding: 0pt 20pt 20pt 20pt;
  height: 100%;
  border-bottom-left-radius: 20pt;
  border-bottom-right-radius: 20pt;
  background-color: #303440;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ClassRow = styled.div`
  background-color: #33405b;
  padding: 7pt;
  margin: 5pt;
  border-radius: 5pt;
  text-align: left;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ClassTitle = styled.div`
  font-size: 18pt;
`;

const ClassSubtitle = styled.div`
  font-size: 12pt;
  color: #c1c1c1;
`;


export default GradeTracker;

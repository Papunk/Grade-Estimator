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

import plusSign from './icons/plus-white.png';


function GradeTracker() {
  const [currentSemester, setCurrentSemester] = useState("Spring 2023");

  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [currentCourse, setCurrentCourse] = useState(null);
  const [addingCourse, setAddingCourse] = useState(false);

  function handleAddCourse(newCourse) {
    setAddingCourse(false);
    setCourses([...courses, newCourse]);
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
            <CircularButton color="#009193" onClick={null}>
              <img src={pencil} width="20" height="20"/>
            </CircularButton>
            <CircularButton color="#4ea0d9" onClick={() => setAddingCourse(true)}>
              <img src={plusSign} width="20" height="20"/>
            </CircularButton>
          </HStack>
        </HStack>
        {courses.map((course, index) => (
          <div key={index}>
            <HStack>
              <ClassRow>
                <HStack>
                  <div>
                    <ClassTitle>{courses[index].name}</ClassTitle>
                    <ClassSubtitle>{courses[index].code}</ClassSubtitle>
                  </div>
                  {/* TODO: add color to button */}
                  <CircularButton color="#283247">
                    <img src={chevronRight} width="20" height="20"/>
                  </CircularButton>
                </HStack>
              </ClassRow>
            </HStack>
          </div>
        ))}

      </div>

      {
        addingCourse ?
        <ExpandableModal onClose={() => setAddingCourse(false)}>
          <EditCourse course={currentCourse} addCourse={handleAddCourse}></EditCourse>
        </ExpandableModal> : null
      }

    </Container>
  );
}


const Title = styled.div`
  font-size: 30pt;
  font-weight: bold;
  margin: 10pt 0pt 10pt 0pt;
`;

const Subtitle = styled.div`
  font-size: 20pt;
  font-weight: bold;
  margin: 10pt 0pt 10pt 0pt;
`;

const Container = styled.div`
  width: 40%;
  max-width: 500pt;
  min-width: 300pt;
  padding: 0pt 20pt 20pt 20pt;
  height: 100%;
  border-bottom-left-radius: 20pt;
  border-bottom-right-radius: 20pt;
  background-color: #303440;
`;

const ClassRow = styled.div`
  background-color: #33405b;
  padding: 7pt;
  margin: 5pt;
  border-radius: 5pt;
  width: 100%;
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

import React, { useState } from 'react';
import EditCourse from './screens/EditCourse';
import CircularButton from './components/CircularButton';
import ExpandableModal from './components/ExpandableModal';
import HStack from './components/HStack';
import styled from 'styled-components';

import chevronRight from './icons/chevron-right.png'
import Semester from './classes/Semester'
import EditableTextField from './components/EditableTextfield';
import PillButton from './components/PillButton';
import Title from './components/Title'
import Subtitle from './components/Subtitle'

import plusSign from './icons/plus-white.png';


// TODO: Semester approach:
// - always have an empty semester at th end
// - have it be displayed as "add semester"

function GradeTracker() {
  const [semesters, setSemesters] = useState([new Semester("", [])]);
  const [currentSemester, setCurrentSemester] = useState(semesters[0]);

  const [currentCourse, setCurrentCourse] = useState(null);
  const [addingCourse, setAddingCourse] = useState(false);
  
  function handleAddCourse(newCourse) {
    setCurrentCourse(null);
    setAddingCourse(false);
    const updatedCourseList = [...currentSemester.courses, newCourse]
    editSemester(new Semester(currentSemester.name, updatedCourseList, currentSemester.id));
    // setCurrentSemester(new Semester(currentSemester.name, updatedCourseList, currentSemester.id));
  }

  function handleAddButtonPress() {
    if (currentSemester.name === "") {
      alert("Please enter a name for the semester");
    }
    else {
      setAddingCourse(true);
    }
  }

  function handleEditCourse(updatedCourse) {
    setCurrentCourse(null);
    setAddingCourse(false);
    const updatedCourseList = [];
    for (const elem of currentSemester.courses) {
      // Delete course
      if (elem.id === updatedCourse) {
        continue
      }
      // Update course
      else if (elem.id === updatedCourse.id) {
        updatedCourseList.push(updatedCourse);
      }
      else {
        updatedCourseList.push(elem);
      }
    }
    editSemester(new Semester(currentSemester.name, updatedCourseList, currentSemester.id));
  }

  function editCourse(course) {
    setAddingCourse(() => true);
    setCurrentCourse(() => course);
  }

  function stopEditing() {
    setCurrentCourse(null);
    setAddingCourse(false);
  }

  function editSemester(newSemester) {
    const newSemesterList = [];
    for (const sem of semesters) {
      if (sem.id === newSemester.id) {
        newSemesterList.push(newSemester);
      }
      else {
        newSemesterList.push(sem);
      }
    }
    setSemesters(newSemesterList);
    setCurrentSemester(newSemester);
  }

  function setCurrentSemesterName(name) {
    const newSem = new Semester(name, currentSemester.courses, currentSemester.id)
    editSemester(newSem);
  }

  function addEmptySemester() {
    if (currentSemester.name === "") {
      alert("Please enter a name for the semester");
    }
    else {
      const newSem = new Semester("", []);
      setCurrentSemester(newSem);
      const semestersCopy = semesters;
      semestersCopy.push(newSem);
      setSemesters(semestersCopy);
    }
  }

  function selectSemester(semID) {
    for (const sem of semesters) {
      if (sem.id === semID) {
        setCurrentSemester(sem);
        return
      }
    } 
  }

  function deleteSemester(semID) {
    if (!window.confirm("Delete this semester?")) {
      return;
    }
    const newSemesterList = [];
    for (const sem of semesters) {
      if (sem.id === semID) {
        continue;
      }
      newSemesterList.push(sem);
    }
    if (newSemesterList.length === 0) {
      const emptySem = new Semester("", []);
      setSemesters([emptySem]);
      setCurrentSemester(emptySem);
    }
    else {
      setSemesters(newSemesterList);
      setCurrentSemester(newSemesterList[newSemesterList.length-1]);
    }
  }


  return (
    <Container>
      <Title>Grade Tracker</Title>
      <hr/>
      <div>
        <HStack>
          <Subtitle style={{textAlign: "left"}}>
            <EditableTextField type="text" value={currentSemester.name} onChange={(e) => setCurrentSemesterName(e.target.value)} placeholder="New semester"/>
          </Subtitle>
          <HStack>
          <select value={currentSemester.id} onChange={(e) => selectSemester(e.target.value)}>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {
                  semester.name ? semester.name : "--"
                }
              </option>
            ))}
          </select>
            <CircularButton color="#4ea0d9" onClick={handleAddButtonPress}>
              <img alt="add course" src={plusSign} width="20" height="20"/>
            </CircularButton>
          </HStack>
        </HStack>
        {currentSemester.courses.map((course, index) => (
          <div key={index}>
            <ClassRow>
              <HStack>
                <div>
                  <ClassTitle>{course.name}</ClassTitle>
                  <ClassSubtitle>{course.code}</ClassSubtitle>
                </div>
                <CircularButton color="#283247" onClick={() => editCourse(course)}>
                  <img alt="edit course" src={chevronRight} width="20" height="20"/>
                </CircularButton>
              </HStack>
            </ClassRow>
          </div>
        ))}

        <HStack>
          <Subtitle>Semester Metrics</Subtitle>
        </HStack>
        <hr/>

        Add courses...

        <BigMargin>
          <HStack>
            <PillButton text={"Delete Semester"} backgroundColor="#ff6b60" textColor="white" onClick={() => deleteSemester(currentSemester.id)}/>
            <PillButton text={"New Semester"} backgroundColor="#4ea0d9" textColor="white" onClick={addEmptySemester}/>
          </HStack>
        </BigMargin>
      </div>
      

      {
        addingCourse ?
        <ExpandableModal onClose={stopEditing}>
          <EditCourse course={currentCourse} modifyCourses={currentCourse ? handleEditCourse : handleAddCourse}></EditCourse>
        </ExpandableModal> : null
      }

    </Container>
  );
}

const BigMargin = styled.div`
margin-top: 20pt;
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


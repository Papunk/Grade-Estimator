import React, { useState } from 'react';
import AddCourse from './screens/AddCourse';
import CircularButton from './components/CircularButton';
import ExpandableModal from './components/ExpandableModal';
import HStack from './components/HStack';


import Course from './classes/Course';

import plusSign from './icons/plus-white.png';


function GradeTracker() {
  const [courses, setCourses] = useState([]);

  function handleAddCourse(newCourse) {
    setCourses([...courses, newCourse]);
    console.log(courses)
  }

  return (
    <div>
      <h1>Grade Tracker</h1>
      <div>
        <HStack>
          <h2>Classes</h2>
          <ExpandableModal trigger={<CircularButton src={plusSign} color="#4ea0d9" size="40px"/>}>
            <AddCourse returnCourse={handleAddCourse}></AddCourse>
          </ExpandableModal>
        </HStack>
        {courses.map((course, index) => (
          <div key={index}>
            <HStack>
              <label htmlFor={`class-${index}`}>• {courses[index].name} ({courses[index].code})</label>
            </HStack>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GradeTracker;

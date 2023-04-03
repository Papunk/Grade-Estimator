import React, { useState } from 'react';
import CircularButton from './components/CircularButton';
import HStack from './components/HStack';
import ExpandableModal from './components/ExpandableModal';
import AddCourse from './AddCourse';
import plusSign from  './icons/plus-white@2x.png'




// TODO:
// make the modal accept a function to be executed when closed
//  that function can then modify the contents of the caller (like adding a class)
// make each class row open up a modal with details

function GradeTracker() {
  const [courses, setCourses] = useState([]);

  function handleAddCourse(courseName) {
    setCourses([...courses, courseName]);
  }

  return (
    <div>
      <h1>Grade Tracker</h1>
      <div>
        <HStack>
          <h2>Classes</h2>
          <ExpandableModal
            trigger={<CircularButton src={plusSign} color="#4ea0d9" size="40px" onClick={handleAddCourse} />}
          >
            <AddCourse onClick={console.log("Fongui")} addCourse={handleAddCourse}></AddCourse>
          </ExpandableModal>
        </HStack>
        {courses.map((course, index) => (
          <div key={index}>
            <HStack>
              <label htmlFor={`class-${index}`}>{courses.name}</label>
            </HStack>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GradeTracker;

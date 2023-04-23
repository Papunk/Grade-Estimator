import GradeTracker from  './MainScreen';
import './App.css';
import styled from 'styled-components';


function App() {
  return (
    <Container>
        <GradeTracker></GradeTracker>
    </Container>
  );
}


const Container = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* font-size: calc(10px + 2vmin); */
  color: white;
`


export default App;

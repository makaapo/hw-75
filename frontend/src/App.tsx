import {Container} from '@mui/material';
import Home from './features/Home/Home';

const App = () => {
  return (
    <>
      <Container maxWidth="xl" component="main">
        <Home/>
      </Container>
    </>
  );
};

export default App

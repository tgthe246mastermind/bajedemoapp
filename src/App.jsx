import { Routes, Route, useNavigate } from 'react-router-dom';



import Baje from './Baje.jsx';






function App() {
 

  return (
   
      <Routes>
        <Route path="/" element={<Baje />} />
       
      </Routes>
   
  );
}

export default App;

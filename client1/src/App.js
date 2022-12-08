import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Edit } from './components/edit';
import { Details } from './components/sms';
import { Employees } from './components/employees';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
              <Route path='/' element={<Employees/>}/>
              <Route path='/details' element={<Details/>}/>
              <Route path='/edit' element={<Edit/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
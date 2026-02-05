import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import HootList from './components/HootList/HootList'
import * as hootService from './services/hootService'
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';

import { UserContext } from './contexts/UserContext';



const App = () => {
  const navigate = useNavigate();

  const [hoots, setHoots] = useState([]);
  const { user } = useContext(UserContext); // user becomes a global state
  

  useEffect(()=> {
    const fetchAllHoot = async () => { // cannot make useEffect async directly, so we add it here
      const hootsData = await hootService.index(); // grabs the index from hootService

      setHoots(hootsData)
    }

    if (user) fetchAllHoot(); // is user exists(logged in), function runs and fetches the data
  },[user]); // [user] tells react when to run => "Only run this code when the user variable changes."

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot,...hoots]);
    navigate('/hoots')
  }

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        { user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/hoots' element={<HootList hoots={hoots}/>}/>
            <Route path='/hoots/:hootId' element={<HootDetails />} />
            <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot}/>} />

          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;

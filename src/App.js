import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes';
import 'react-photo-view/dist/react-photo-view.css';

function App() {
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  );
}

export default App;

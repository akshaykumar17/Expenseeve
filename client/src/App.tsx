import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import ToolBar from './ToolBar/ToolBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App" style={{height:'55rem'}}>
        <ToolBar />
      </div>
    </Provider>
  );
}

export default App;

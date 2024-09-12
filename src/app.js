import React, {useState} from 'react';
import Pomodoro from './timer';
import Settings from './settings';
import Playlist from './playlist';
import NavigationBar from './navbar';
import Wallpaper from './wallpaper';
import Fonts from './fonts';
import './app.css';
import './fonts.css';
import logo from './assets/flowapp-logo.png';


function App(){

  const[videoBackground , setVideoBackground] = useState(Wallpaper[0].src);
  const [currentFont, setCurrentFont] = useState(Fonts[0].fontFamily); 
  const [isRunning, setIsRunning] = useState(false);
  const[focusTime, setFocusTime] = useState(1500);
  const[breakTime, setBreakTime] = useState(600);
  const [selectFormat, setSelectFormat] = useState('standardTime');

  return (

    <div className="container">


        <video className="videoBackground" src={videoBackground} autoPlay loop muted />    

        <div className = "top">
          <div className="countdownTimer" style = {{fontFamily: currentFont}} >
        
              <Pomodoro 
                focusTime={focusTime}
                breakTime={breakTime}
                selectFormat={selectFormat}
                isRunning = {isRunning}
                
                setFocusTime={setFocusTime}
                setBreakTime={setBreakTime}
                setSelectFormat={setSelectFormat}
                setIsRunning= {setIsRunning}
              />
          </div>

          <div className = "playlist">
            <Playlist />
          </div>

        </div>

        <div className = "navigationbar" >
          <NavigationBar 
            setVideoBackground={setVideoBackground} 
            setCurrentFont={setCurrentFont}
          />
        </div>


        <div className = "bottom">

          <div className = "logo">
            <img  src = {logo} alt = "flowapp-logo" />
          </div>

          <div className = "settings">
            <Settings 
              focusTime={focusTime}
              breakTime={breakTime}
              selectFormat={selectFormat}
              isRunning= {isRunning}

              setFocusTime={setFocusTime}
              setBreakTime={setBreakTime}
              setSelectFormat={setSelectFormat}
              setIsRunning={setIsRunning}
            />                
          </div>
          
        </div>
     
    </div>
  );

}


export default App;
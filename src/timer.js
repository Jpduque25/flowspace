import React, {useEffect, useState, useRef} from 'react';
import styles from './countdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './fonts.css';
import soundNotification from './assets/audio/digitalwatch.mp3';
import clockIcon from './assets/clock-icon.png';



function Pomodoro( { focusTime, breakTime, selectFormat, setFocusTime, setBreakTime, setSelectFormat, isRunning, setIsRunning}){

    const[clock, setClock] = useState(new Date());
    const [display, setDisplay] = useState('clock');
    const sound = useRef(new Audio(soundNotification));


    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
        stopSound();
    };

    const resetTime = () => {
        setIsRunning(false);
        setFocusTime(1500);
        setBreakTime(300);
        stopSound();
    };

    const stopSound = () => {
        sound.current.pause();
        sound.current.currentTime = 0;
    }

    useEffect ( () => {
        const timer = setInterval( () => {
            setClock(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let timer;

        if (isRunning){
          if (display === 'focus' && focusTime > 0){
            timer = setInterval (() => {
                setFocusTime((prevTime) => prevTime - 1);
            }, 1000);
            
          } else if (display === 'break' && breakTime > 0){
            timer = setInterval (() => {
                setBreakTime((prevTime) => prevTime - 1);
            }, 1000);


        } else if ((display === 'focus' && focusTime === 0) || (display === 'break' && breakTime === 0)) {
            sound.current.play();
            setIsRunning(false);
        }

    }

        return () => clearInterval(timer);
    
    }, [isRunning, focusTime, breakTime, display]);


    useEffect(() => {
        setIsRunning(false);
    }, [display])

    //    military time
    const militaryClock = (time) => {
        var hours = time.getHours().toString().padStart(2, '0');
        var minutes = time.getMinutes().toString().padStart(2, '0');
        var seconds = time.getSeconds().toString().padStart(2, '0');
        return `${hours} : ${minutes} : ${seconds}`;
    };

    // standard time
    const standardClock = (time) => {
        let hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
      
        const timeOfDay = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12 || 12; 
      
        return `${hours.toString().padStart(2, '0')} : ${minutes} : ${seconds} ${timeOfDay}`;
    };
      
    // function for formatting countdown timers
    const formatTime = (time) => {
        const hours = Math.floor(time/3600).toString().padStart(2, '0');
        const minutes =  Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2 , '0');
        return `${hours} : ${minutes} : ${seconds}`;
    };

    return (
        <div className = {styles.displayTimer} style = {{}}>

            <div className = {styles.firstRow}>
              
            
                <div onClick={() => setDisplay('clock')}><img className  = {` ${styles.clock} ${display ===  'clock' ? styles.active : ''} `} src = {clockIcon} alt='clock'/>
                </div>

                <button className  = {` ${styles.countdown} ${display ===  'focus' ? styles.active : ''} `} onClick={() => setDisplay('focus')}>Focus</button>

                <button className  = {` ${styles.countdown} ${display ===  'break' ? styles.active : ''} `} onClick={() => setDisplay('break')}>Break</button>
                
            </div>

            <div className = {styles.timeDisplay}>
                {display === 'clock' && (selectFormat === 'militaryTime' ? militaryClock(clock) : standardClock(clock))}
                {display === 'focus' && formatTime(focusTime)}
                {display === 'break' && formatTime(breakTime)}
            </div>

            {display !== 'clock' && ( 

                <div className = {styles.thirdRow}>
                    <button  className = {styles.startButton} type = "button" onClick = {isRunning ? stopTimer : startTimer}>
                        {isRunning ? 'Stop' : 'Start'}
                    </button>
                        
                    <div className = {styles.resetButton} onClick={resetTime} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faRotateRight} size="lg" style = {{color: '#ffffff'}}/></div>        
                </div>
            )}

        </div>
    );

}

export default Pomodoro;
import React, {useState} from 'react';
import styles from './settings.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import militaryTime from './assets/militaryTime.png'
import standardTime from './assets/standardTime.png'



function Settings({focusTime, breakTime, selectFormat, setFocusTime, setBreakTime, setSelectFormat, setIsRunning}){

    const[settingsMenu, setSettingsMenu] = useState('closed');

    const[localFocusTime, setLocalFocusTime] = useState(focusTime/60);
    const[localBreakTime, setLocalBreakTtime] = useState(breakTime/60);

    const handleFocusChange = (e) => {
        let newFocusTime = e.target.value;

        if(newFocusTime !== '') {
            newFocusTime = parseInt(newFocusTime, 10);
        }

        setLocalFocusTime(newFocusTime || '');;
    };

    const handleBreakChange = (e) => {
        let newBreakTime = e.target.value;

        if(newBreakTime !== ''){
            newBreakTime = parseInt(newBreakTime, 10);
        }
        
        setLocalBreakTtime(newBreakTime || '');
        console.log("break time updated")
    };

    const toggleStandardTime = () => {
        setSelectFormat('standardTime');
        console.log('Standard Time selected');
    };

    const toggleMilitaryTime =() => {
        setSelectFormat('militaryTime');
        console.log('Military Time selected');
    }

      // Function to handle saving changes
    const handleSaveChanges = () => {
        setFocusTime(localFocusTime * 60); 
        setBreakTime(localBreakTime * 60); 

        setIsRunning(false);
        setSettingsMenu('closed');
    };

    const openSettingsMenu = () => {
        setSettingsMenu('open');
    }

    const closeSettingsMenu = () => {
        setSettingsMenu('closed');
    }

    return(

        <div className = {styles.settingsContainer}>

            <div className = {styles.settingsBtn} onClick = {openSettingsMenu}>
                <FontAwesomeIcon icon={faGear} size="lg" style={{color: "#ffffff",}} />
            </div>
        
            {settingsMenu === 'open' && (

                <div className = {styles.menu}>

                    <div className = {styles.closeIcon} onClick = {closeSettingsMenu}>
                        <FontAwesomeIcon icon={faXmark} size = "2xl"/>
                    </div>

                    <div className = {styles.title}>
                        <FontAwesomeIcon icon={faGear} size="xl" style={{color: "#ffffff",}} />
                        <h1>Settings</h1>
                    </div>


                    <div className = {styles.input}>

                        <div className = {styles.left}>
                            <h2>Focus</h2>
                            <input 
                                value = {localFocusTime}
                                onChange = {handleFocusChange}
                                type="number"
                                placeholder = "minutes"
                                min="1"
                            />
                        </div>
                        
                        <div className = {styles.right}>
                            <h2>Break</h2>
                            <input 
                                value={localBreakTime}
                                onChange={handleBreakChange}
                                type="number"
                                placeholder = "minutes"
                                min="1"
                            />         
                        </div>
                    
                    </div>

                    <div className = {styles.format}>
                        <h2>Format</h2>

                        <div className = {styles.selectTime}>
                            <div>
                                <img className = { `${styles.toggleTime} ${selectFormat === 'standardTime' ? styles.selected : ''}  `} onClick = {toggleStandardTime} src=  {standardTime} alt = "standard time"/>
                                <h3>Standard Time</h3>
                            </div>

                            <div>
                                <img className = { `${styles.toggleTime} ${selectFormat === 'militaryTime' ? styles.selected : ''} `} onClick = {toggleMilitaryTime} src= {militaryTime} alt = "military time"/>
                                <h3>Military Time</h3>
                            </div>
                        </div>  
                    </div>

                    <div className={styles.buttonContainer}>

                        <button className= {styles.submitBtn} onClick={handleSaveChanges}>
                        Save Changes
                        </button>
                    </div>
                            

                </div>
        
                )
            
            }

        </div>

    
    );

    // <button className= {`${styles.submitBtn} ${saveButton === true ? styles.active : ''} `} onClick={handleSaveChanges}>
    // Save Changes
    // </button>

    




}

export default Settings;
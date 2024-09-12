import React, {useState} from 'react';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import Wallpapers from './wallpaper';
import Fonts from './fonts';
import './fonts.css';

function NavigationBar({setVideoBackground, setCurrentFont}){

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const[currentTab , setCurrentTab] = useState('backgroundImage');
    const[selectTheme , setSelectTheme] =  useState(Wallpapers[0].src);
    const[selectFont, setSelectFont] = useState(Fonts[0].fontFamily);

    const handleTabChange =  (tab) => {
        setCurrentTab(tab);
    }

    const handleBackgroundChange = (wallpaper) => {
        setVideoBackground(wallpaper);
        setSelectTheme(wallpaper);
    }

    const handleFontChange = (font) => {
        setCurrentFont(font); 
        setSelectFont(font);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen)
    }


    return (
        <div>

            <div className = { `${styles.navbar} ${isNavbarOpen ? styles.open : ''}`}>

                <div className = {styles.navbarButton} onClick = {toggleNavbar}>
                    <FontAwesomeIcon icon={faCaretLeft} size="2xl" style={{color: "#ffffff",}} />
                </div>

                <div className = {styles.navbarContent}>

                    <div className = {styles.icons}>
                        
                        <div className = {` ${currentTab === 'backgroundImage' ? styles.iconActive : ''} `}>
                            <div className = {styles.backgroundImage} onClick = {() => handleTabChange('backgroundImage')}></div>
                        </div>

                        <div className = {` ${currentTab === 'typography' ? styles.iconActive : ''} `}>
                            <div className = {styles.typography} onClick = {() => handleTabChange('typography')}></div>
                        </div>

                    </div>

                    {currentTab === 'backgroundImage' && ( 

                        <div>

                            <div className = {styles.border}></div>

                            <p className = {styles.text}>Select a dynamic theme that elevates your focus and boosts productivity during your focus sesions.</p>

                            <div className = {styles.wallpaperList}>

                                {Wallpapers.map((wallpaper) => (
                                    <img className = {`${styles.wallpaper} ${selectTheme === wallpaper.src ? styles.active : ''}`} src = {wallpaper.button} onClick = {() => handleBackgroundChange(wallpaper.src)} alt = {`${wallpaper.alt} background`}/>
                                ))}

                            </div>

                        </div>
                        
                    )}
                
                    {currentTab === 'typography' && (
                    
                        <div>

                            <div className = {styles.border}></div>

                            <p className = {styles.text}>Explore our custom-designed fonts to add a personal touch to your focus sessions. </p>

                            <div className = {styles.typefaceList}>

                                {Fonts.map((font) =>  (
                                    
                                    <div
                                        className = {`${styles.gridItem} ${selectFont === font.fontFamily ? styles.active : '' }`} 
                                        onClick = {() => handleFontChange(font.fontFamily)}
                                    >
                                        <img src={font.src} alt={`${font.name} typeface`} />
                                        <div className={styles.fontName}>{font.name}</div>
                                    </div>
                                ))}

                            </div>
                            
                        </div>

                    )}

                </div>

               
            </div>

          
        </div>

    );

}

export default NavigationBar;
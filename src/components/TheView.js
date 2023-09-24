import React, { useEffect } from 'react';
import { Viewport } from '../lib/viewport';
import { useGlobalState } from '../context/UContext';
import ScriptingTab from './Tabs/ScriptingTab';
import RecipeMakerTab from './Tabs/RecipeMakerTab';

const TheView = ({viewport}) => {

    const { globalState, setGlobalState } = useGlobalState();

    window.addEventListener('keydown', (ev) => {
        ev.preventDefault();
        if(ev.ctrlKey && ev.key == 'd'){
            viewport?.duplicate();
        }
    });
    
    return (
        <div className='h-full'>
            <div
                id="viewport"
                className={`w-full h-full ${globalState.currentTab !== 0 ? 'hidden' : ''}`}
            ></div>
            {globalState.currentTab === 1 ? <ScriptingTab /> : globalState.currentTab === 2 ? <RecipeMakerTab /> : <></>}
        </div>
    );
}
 
export default TheView;
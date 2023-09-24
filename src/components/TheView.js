import React, { useEffect } from 'react';
import { Viewport } from '../lib/viewport';
import { useGlobalState } from '../context/UContext';
import ScriptingTab from './Tabs/ScriptingTab';
import RecipeMakerTab from './Tabs/RecipeMakerTab';

const TheView = ({contextMenu}) => {

    const { globalState, setGlobalState } = useGlobalState();
    
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
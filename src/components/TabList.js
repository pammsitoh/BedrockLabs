import React from 'react';
import { useGlobalState } from '../context/UContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireBurner, faMountainSun, faScroll } from '@fortawesome/free-solid-svg-icons';

const TabList = () => {

    const { globalState, setGlobalState } = useGlobalState();

    const Select3DView = () => {
        const updating = { ...globalState, currentTab: 0 }

        setGlobalState(updating);
    }

    const SelectScripting = () => {
        const updating = { ...globalState, currentTab: 1 }

        setGlobalState(updating);
    }

    const SelectRecipeMaker = () => {
        const updating = { ...globalState, currentTab: 2 }

        setGlobalState(updating);
    }

    return (
        <>
            <button onClick={Select3DView} className="bg-zinc-700 border border-zinc-600 text-white p-2"><FontAwesomeIcon icon={faMountainSun} /> 3D View</button>
            <button onClick={SelectScripting} id="toggleScript" className="bg-zinc-700 border border-zinc-600 text-white p-2"><FontAwesomeIcon icon={faScroll} /> Code</button>
            <button onClick={SelectRecipeMaker} id="recipe-editor-toggle" className="bg-zinc-700 border border-zinc-600 text-white p-2"><FontAwesomeIcon icon={faFireBurner} /> Recipe Maker</button>
        </>
    );
}
 
export default TabList;
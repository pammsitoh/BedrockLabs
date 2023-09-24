import React from 'react';
import { useGlobalState } from '../../context/UContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faRobot } from '@fortawesome/free-solid-svg-icons';

const TreeView = () => {

    const { globalState, setGlobalState } = useGlobalState();

    const getTypeIcon = (type) => {
        if(type == 'block') {
            return <FontAwesomeIcon icon={faCube} />
        }else if(type == 'entity') {
            return <FontAwesomeIcon icon={faRobot} />
        }
    }

    return (
        <ul id="objects">
            
            {
                globalState.sceneObjects.map( ob => <div className="bg-zinc-700 text-white p-1 m-2 text-sm">{getTypeIcon(ob.type)} {ob.name}</div> )
            }

        </ul>
    );
}
 
export default TreeView;
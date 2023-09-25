import React from 'react';
import { useGlobalState } from '../../context/UContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faRobot } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'

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
                globalState.sceneObjects.map( ob => <motion.div drag dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} className="bg-zinc-700 text-white p-1 m-2 text-sm">{getTypeIcon(ob.type)} {ob.name}</motion.div> )
            }

        </ul>
    );
}
 
export default TreeView;
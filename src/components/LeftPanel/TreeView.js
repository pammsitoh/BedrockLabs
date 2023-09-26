import React from 'react';
import { useGlobalState } from '../../context/UContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faRobot, faClose } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const TreeView = ({viewport}) => {
    const { globalState, setGlobalState } = useGlobalState();

    if(viewport != null) {
        const objects = viewport.scene.children.filter((object => { return object.isMesh}))
        const getTypeIcon = (type) => {
            if (type === 'block') {
                return <FontAwesomeIcon icon={faCube} />;
            } else if (type === 'entity') {
                return <FontAwesomeIcon icon={faRobot} />;
            }
        };
    
        const removeElement = (date) => {
            const updatedSceneObjects = globalState.sceneObjects.filter((ob) => ob !== date);
            setGlobalState({ ...globalState, sceneObjects: updatedSceneObjects });
            viewport.removeCube(date);
        };
    
        return (
            <ul id="objects">
                {objects.map((ob) => (
                    <motion.div
                        key={ob.uuid} // Asegúrate de agregar una clave única para cada elemento en el mapeo
                        drag
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        className="bg-zinc-700 text-white p-1 m-2 text-sm"
                    >
                        {getTypeIcon(ob.type)} {ob.name}
                        <button onClick={() => removeElement(ob)}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </motion.div>
                ))}
            </ul>
        );
    } else {
        return <ul id="objects"></ul>
    }
};

export default TreeView;
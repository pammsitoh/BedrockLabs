import { useGlobalState } from '../../context/UContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faRobot, faClose, faEye } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const TreeView = ({ viewport }) => {
    const { globalState, setGlobalState } = useGlobalState();

    const object = {
        width: '89%',
        textAlign: 'left',
    }

    if (viewport != null) {
        const objects = viewport.scene.children.filter((object => { return object.isMesh }))
        const getTypeIcon = (type) => {
            if (type === 'block') {
                return <FontAwesomeIcon icon={faCube} />;
            } else if (type === 'entity') {
                return <FontAwesomeIcon icon={faRobot} />;
            }
        };

        const removeElement = (date) => {
            console.log(faEye)
            setGlobalState({ ...globalState, sceneObjects: globalState.sceneObjects });
            viewport.removeCube(date);
        };
        
        const hideElement = (date) => {
            date.visible = !date.visible;
            setGlobalState({ ...globalState, sceneObjects: globalState.sceneObjects });
        };

        return (
            <ul id="objects">
                {objects.map((ob) => (
                    <motion.div style={{ display: 'flex' }}
                        key={ob.uuid} // Asegúrate de agregar una clave única para cada elemento en el mapeo
                        drag
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        className="bg-zinc-700 text-white p-1 m-2 text-sm"
                    >
                        <div style={object}>
                            {getTypeIcon(ob.type)} {ob.name}
                        </div>
                        <div>
                            <button style={{marginRight: '3px'}} onClick={() => removeElement(ob)}>
                                <FontAwesomeIcon icon={faClose} />
                            </button>

                            <button onClick={() => hideElement(ob)}>
                                { !ob.visible &&
                                    <FontAwesomeIcon icon={'fa-solid fa-eye'} />
                                }
                                { ob.visible &&
                                    <FontAwesomeIcon icon={'fa-regular fa-eye'} />
                                }
                            </button>
                        </div>
                    </motion.div>
                ))}
            </ul>
        );
    } else {
        return <ul id="objects"></ul>
    }
};

export default TreeView;
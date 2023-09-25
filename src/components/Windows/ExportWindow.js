import React from 'react';
import { useGlobalState } from '../../context/UContext';
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faBox, faEarthAmericas, faFaceLaughWink, faFileZipper, faMountainSun, faPercent, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

const ExportWindow = () => {

    const { globalState, setGlobalState } = useGlobalState();

    const closeWindow = (event) => {

        if (event.target === event.currentTarget) {
            setGlobalState( {...globalState, wantExport: false} );
        }

    }

    return (
        <>
            
            {
                globalState.wantExport == true ?
                <motion.div onClickCapture={closeWindow} initial={{ opacity: 0 }} animate={{ opacity: 70 }} className='backdrop-blur-sm absolute h-screen w-screen flex justify-center items-center bg-slate-950 bg-opacity-70'>
                
                    <motion.div initial={{ scale: 0  }} animate={{ scale: 1 }} className='p-5 h-2/3 w-2/3 bg-zinc-800 border border-zinc-500 text-white flex flex-col justify-between'>
                        <div className='h-1/6'><h1 className='text-4xl'>Export as</h1></div>

                        <div className='grid grid-cols-6 gap-4 h-4/6'>

                            <button className='p-5 h-36 rounded-md flex justify-center items-center bg-zinc-700 hover:bg-zinc-500'>
                                <div>
                                    <FontAwesomeIcon className='flex justify-center w-full text-4xl' icon={faEarthAmericas} />
                                    <h1 className=''>.McWorld</h1>
                                </div>
                            </button>

                            <button className='p-5 h-36 rounded-md flex justify-center items-center bg-zinc-700 hover:bg-zinc-500'>
                                <div>
                                    <FontAwesomeIcon className='flex justify-center w-full text-4xl' icon={faPuzzlePiece} />
                                    <h1 className=''>.McAddon</h1>
                                </div>
                            </button>

                            <button className='p-5 h-36 rounded-md flex justify-center items-center bg-zinc-700 hover:bg-zinc-500'>
                                <div>
                                    <FontAwesomeIcon className='flex justify-center w-full text-4xl' icon={faBox} />
                                    <h1 className=''>.McPack</h1>
                                </div>
                            </button>

                            <button className='p-5 h-36 rounded-md flex justify-center items-center bg-zinc-700 hover:bg-zinc-500'>
                                <div>
                                    <FontAwesomeIcon className='flex justify-center w-full text-4xl' icon={faMountainSun} />
                                    <h1 className=''>.McStructure</h1>
                                </div>
                            </button>

                            <button className='p-5 h-36 rounded-md flex justify-center items-center bg-zinc-700 hover:bg-zinc-500'>
                                <div>
                                    <FontAwesomeIcon className='flex justify-center w-full text-4xl' icon={faPercent} />
                                    <h1 className=''>.McFunction</h1>
                                </div>
                            </button>

                            <button className='p-5 h-36 rounded-md flex justify-center items-center bg-zinc-700 hover:bg-zinc-500'>
                                <div>
                                    <FontAwesomeIcon className='flex justify-center w-full text-4xl' icon={faFaceLaughWink} />
                                    <h1 className=''>Bedrock Labs Project</h1>
                                </div>
                            </button>

                            <button className='p-5 h-36 rounded-md flex justify-center items-center bg-zinc-700 hover:bg-zinc-500'>
                                <div>
                                    <FontAwesomeIcon className='flex justify-center w-full text-4xl' icon={faFileZipper} />
                                    <h1 className=''>.ZIP</h1>
                                </div>
                            </button>

                        </div>

                        <div className='h-1/6'><button onClick={closeWindow}>Close</button></div>
                    </motion.div>

                </motion.div>
                :
                <></>
            }

        </>
    );
}
 
export default ExportWindow;
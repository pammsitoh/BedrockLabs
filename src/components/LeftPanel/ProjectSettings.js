import { useGlobalState } from '../../context/UContext';

const ProjectSettings = () => {

    const { globalState, setGlobalState } = useGlobalState();

    const ExportProject = () => {
        setGlobalState({ ...globalState, wantExport: true   });
        console.log("WOW");
    }

    return (
        <div className='p-5'>

            <div className='p-2 grid grid-cols-1 gap-2'>
                <button className='rounded-md bg-zinc-600 text-white p-2 w-full'>New Project</button>
                <button className='rounded-md bg-zinc-600 text-white p-2 w-full'>Save Project</button>
                <button className='rounded-md bg-zinc-600 text-white p-2 w-full'>Load Project</button>
                <button onClick={ExportProject} className='rounded-md bg-zinc-600 text-white p-2 w-full'>Export Project</button>
            </div>
        </div>
    );
}
 
export default ProjectSettings;
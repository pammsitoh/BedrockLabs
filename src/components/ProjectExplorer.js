import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProjectExplorer = () => {
    return (
        <div className="bg-zinc-900 h-2/6 border-t border-zinc-600 p-2 text-white">
            <h4 className="p-2">Project Explorer</h4>
            <div className="w-full p-2 grid grid-cols-10 gap-4 mt-4 bg-zinc-800">
                <div className="text-zinc-400 p-2 grid grid-cols-1 gap-2">
                    <FontAwesomeIcon icon={faFolder} className="text-6xl" />
                    <h1 className="">Textures</h1>
                </div>

                <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                    <FontAwesomeIcon icon={faFile} className="text-6xl" />
                    <h1 className="">Cubito.blp</h1>
                </div>
            </div>
        </div>
    );
};

export default ProjectExplorer;

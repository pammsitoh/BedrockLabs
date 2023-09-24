import { faCube } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ContextMenu = ({viewport}) => {

    const ClickedOption = () => {

        let ctx = document.querySelector("#contextMenu");
        ctx.classList.add("hidden");
        ctx.classList.remove("block");
        viewport.addCube();
        
    }

    return (
        <div id="contextMenu" className="absolute bg-zinc-950 border border-zinc-800 text-white p-2 hidden">
            <h1>Create</h1>
            <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <ul className="grid grid-cols-1">
                <li onClick={ClickedOption} className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a id="addcube" className="p-1 w-full" href="#" ><FontAwesomeIcon icon={faCube} /> Block</a></li>
                <li className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a className="p-1 w-full" href="#" onclick="the_view.addEntity()"><i className="fa-solid fa-robot"></i> Entity</a></li>
                <li className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a className="p-1 w-full" href="#" onclick="the_view.addCube()"><i className="fa-solid fa-drumstick-bite"></i> Item</a></li>
                <li className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a className="p-1 w-full" href="#" onclick="the_view.addCube()"><i className="fa-solid fa-laptop-code"></i> Trigger</a></li>
                <li className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a className="p-1 w-full" href="#" onclick="the_view.addCube()"><i className="fa-solid fa-star"></i> Spawn</a></li>
                <li className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a className="p-1 w-full" href="#" onclick="the_view.addCube()"><i className="fa-solid fa-fire-burner"></i> Recipe</a></li>
                <li className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a className="p-1 w-full" href="#" onclick="the_view.addCube()"><i className="fa-solid fa-explosion"></i> Explosion</a></li>
                <li className="hover:bg-zinc-600 text-zinc-400 hover:text-pink-500"><a className="p-1 w-full" href="#" onclick="the_view.addCube()"><i className="fa-solid fa-stopwatch"></i> Timer</a></li>
            </ul>
        </div>
    );
}
 
export default ContextMenu;
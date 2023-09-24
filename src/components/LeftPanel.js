import React from 'react';
import TreeView from './LeftPanel/TreeView';

const LeftPanel = ({ isOpen }) => {

    

    const OpenContextMenu = (ev) => {
        ev.preventDefault();
        let ctx = document.querySelector("#contextMenu");

        ctx.style.left = `${ev.clientX}px`;
        ctx.style.top = `${ev.clientY}px`;
        ctx.classList.add("block");
        ctx.classList.remove("hidden");

    }

    const CloseContextMenu = (ev) => {
        let ctx = document.querySelector("#contextMenu");
        ctx.style.left = `${ev.clientX}px`;
        ctx.style.top = `${ev.clientY}px`;
        ctx.classList.add("hidden");
        ctx.classList.remove("block");
    }

    return (
        <div onContextMenu={OpenContextMenu} onClick={CloseContextMenu} className="bg-zinc-800 col-span-2 border-r border-zinc-600" id="object_panel">
            <div className="bg-zinc-900 flex justify-center text-white border-b border-zinc-600 p-2">Map</div>
            <div className="bg-zinc-900 border-b border-zinc-600 grid grid-cols-2 text-white text-sm">
                <a className="bg-zinc-500 flex justify-center border-r border-zinc-600">Scene</a>
                <a className="flex justify-center">Project</a>
            </div>
            <TreeView />
        </div>
    );
}
 
export default LeftPanel;
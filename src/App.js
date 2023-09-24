import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Viewport } from "./lib/viewport";
import TheView from "./components/TheView";
import ContextMenu from "./components/ContextMenu";
import LeftPanel from "./components/LeftPanel";
import TabList from "./components/TabList";

function App() {

  const [ isOpenContextMenu, SetOpenContextMenu ] = useState(false);
  const [ theView, setTheView ] = useState("");

  const StartViewport = () => {
    let the_view = new Viewport();
    the_view.onStart();
    setTheView(the_view);
  }

  useEffect(() => {
    StartViewport();  
  },[]);
    
  return (
      <body className="h-screen">
        <div className="w-full" id="container">
            <div className="grid grid-cols-12 h-screen">
                <LeftPanel isOpen={SetOpenContextMenu}/>
                <div className="bg-zinc-700 flex flex-col justify-between col-span-8">
                    <div className="">
                        <div className="grid grid-cols-5">
                            <TabList />
                        </div>
                    </div>
                    <div className="h-4/6">
                        <TheView contextMenu={SetOpenContextMenu} />
                        <div id="scripting" className="w-full h-full bg-purple-200 hidden">
                            <textarea id="scripting_zone"></textarea>
                        </div>
                    </div>
                    <div className="bg-zinc-900 h-2/6 border-t border-zinc-600 p-2 text-white">
                        <h4 className="p-2">Assets</h4>
                        <div className="w-full p-2 grid grid-cols-10 gap-4 mt-4 bg-zinc-800">
                            <div className="text-zinc-400 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-folder text-6xl"></i>
                                <h1 className="">Textures</h1>
                            </div>

                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Cubito.blp</h1>
                            </div>

                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                            <div className="text-zinc-200 p-2 grid grid-cols-1 gap-2">
                                <i className="fa-solid fa-file text-6xl"></i>
                                <h1 className="">Ejemplo.blp</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-800 col-span-2 border-l border-zinc-600">
                    <div className="bg-zinc-900 flex justify-center text-white border-zinc-600 p-2">Object properties</div>
                    <div className="bg-zinc-900 border border-zinc-600 grid grid-cols-3 text-white text-sm">
                        <a className="bg-zinc-500 flex justify-center border-r border-zinc-600">C / Groups</a>
                        <a className="flex justify-center border-r border-zinc-600">Components</a>
                        <a className="flex justify-center">Events</a>
                    </div>
                    <div className="mt-2 p-2">
                        <a onclick="the_view.addCube()" className="bg-zinc-600 p-1 flex justify-center text-white rounded-md hover:bg-zinc-400" href="#">
                            <span>Create Component Group &nbsp;</span>
                            <i className="fa-solid fa-circle-plus text-lg"></i>
                        </a>
                    </div>
                    <div className="mt-2 p-2 hidden" id="property_panel">
                        <div className="bg-zinc-900 border border-zinc-600 p-1">
                            <h1 className="text-white">Properties</h1>
                            <hr className="my-1 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                            <div className="text-white">
                                <h1 id="property_name">Name: </h1>
                                <h1 id="property_position">Position: </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {
          theView == "" ?
            <></>
          :
          <ContextMenu viewport={theView}/>
        }
    </body>
  );
}

export default App;

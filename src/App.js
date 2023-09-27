import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Viewport } from "./lib/viewport";
import TheView from "./components/TheView";
import ContextMenu from "./components/ContextMenu";
import LeftPanel from "./components/LeftPanel";
import TabList from "./components/TabList";
import ProjectExplorer from "./components/ProjectExplorer";
import { useGlobalState } from "./context/UContext";
import RightPanel from "./components/RightPanel";
import ExportWindow from "./components/Windows/ExportWindow";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

function StartViewport(gb, sgb) {
    const tv = new Viewport(gb, sgb);
    tv.onStart();
    return tv;
}
  

function App() {

  const [ isOpenContextMenu, SetOpenContextMenu ] = useState(false);
  const [ theView, setTheView ] = useState(null);
  const { globalState, setGlobalState } = useGlobalState();

  useEffect(() => {
    if(theView == null) {
        const newView = StartViewport(globalState, setGlobalState);
        setTheView(newView);
    };
  },[theView]);
    
  return (
      <body className="h-screen">
        <ExportWindow />
        <div className="w-full" id="container">
            <div className="grid grid-cols-12 h-screen">
                <LeftPanel isOpen={SetOpenContextMenu} viewport={theView}/>
                <div className="bg-zinc-700 flex flex-col justify-between col-span-8">
                    <div className="">
                        <div className="grid grid-cols-5">
                            <TabList />
                        </div>
                    </div>
                    <div className="h-4/6">
                        <TheView viewport={theView} />
                        <div id="scripting" className="w-full h-full bg-purple-200 hidden">
                            <textarea id="scripting_zone"></textarea>
                        </div>
                    </div>
                    <ProjectExplorer />
                </div>
                <RightPanel />
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
library.add(fab, fas, far)
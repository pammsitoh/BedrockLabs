import { Editor } from "@monaco-editor/react";
import React from "react";

const code = `{
    "format_version": "1.20.30",
    "minecraft:block": {
        "description": {
            "identifier": "minecraft:copper_block"
        },
        "components": {
            "minecraft:loot": "loot_tables/chests/simple_dungeon.json",
            "minecraft:destroy_time": 4.0,
            "minecraft:friction": 0.6,
            "minecraft:map_color": "#00ff00",
            "minecraft:flammable": {
                "flame_odds": 50,
                "burn_odds": 0
            },
            "minecraft:light_emission": 1
        }
    }
}`;

const ScriptingTab = () => {
  return (
    <Editor
      height="100%"
      defaultLanguage="json"
      defaultValue={code}
      theme="vs-dark"
    />
  );
};

export default ScriptingTab;

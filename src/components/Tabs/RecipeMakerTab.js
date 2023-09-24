import React from "react";

const RecipeMakerTab = () => {
    return (
        <div id="recipe-editor" className="w-full h-full">
            <div className="grid grid-cols-2 h-full">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="grid grid-cols-3 gap-4 ">
                        <a className="p-6 flex justify-center bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>
                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>
                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>

                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>
                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>
                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>

                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>
                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>
                        <a className="p-6 flex justify-center w-24 bg-zinc-800 shadow-inner border border-zinc-200 text-white">
                            <i className="fa-solid fa-splotch"></i>
                        </a>
                    </div>
                </div>
                <div className="w-full h-full bg-zinc-900 p-10">
                    <div className="text-white">
                        <h1 className="text-2xl mb-5">Recipe Maker</h1>
                        <h5>Identifier</h5>
                        <input
                            className="p-2 mb-2 rounded-sm w-full text-black"
                            type="text"
                            placeholder="example:recipe"
                        />

                        <h5>Type</h5>
                        <select id="cars" className="text-black p-2">
                            <option value="audi">Recipe Shaped</option>
                            <option value="audi">Recipe Shapeless</option>
                            <option value="volvo">Furnace Recipe</option>
                            <option value="saab">
                                Recipe Brewing Container
                            </option>
                            <option value="opel">Recipe Brewing Mix</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeMakerTab;

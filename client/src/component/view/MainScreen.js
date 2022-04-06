// import { NavigationContainer } from "@react-navigation/native";
import ChildView from "./eachViews/ChildView";
import { useState, useContext, createContext } from "react";
import ParentView from "./eachViews/ParentView";
import { fontsContext } from "../../../App";

export const CreateParentContext = createContext();

export default function () {
    const [isParent, setIsParent] = useState(false);
    const fontsLoaded = useContext(fontsContext);

    return (
        <CreateParentContext.Provider value={isParent}>
            {isParent ? (
                <ParentView fontsLoaded={fontsLoaded} />
            ) : (
                <ChildView fontsLoaded={fontsLoaded} />
            )}
        </CreateParentContext.Provider>
    );
}

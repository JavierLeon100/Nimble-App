// import { NavigationContainer } from "@react-navigation/native";
import ChildView from "./eachViews/ChildView";
import { useState, useContext, createContext } from "react";
import ParentView from "./eachViews/ParentView";
import { fontsContext } from "../../../App";

export const CreateParentContext = createContext();

export default function (user) {
    const [isParent, setIsParent] = useState(true);
    const fontsLoaded = useContext(fontsContext);

    return (
        <CreateParentContext.Provider value={isParent}>
            {isParent ? (
                <ParentView user={user} fontsLoaded={fontsLoaded} />
            ) : (
                <ChildView user={user} fontsLoaded={fontsLoaded} />
            )}
        </CreateParentContext.Provider>
    );
}

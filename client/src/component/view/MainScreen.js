// import { NavigationContainer } from "@react-navigation/native";
import ChildsView from "./eachViews/ChildsView";
import { useState, useContext } from "react";
import ParentView from "./eachViews/ParentView";
import { fontsContext } from "../../../App";

export default function(){
    const [isParent, setIsParent] = useState(true)
    const fontsLoaded = useContext(fontsContext)
    
    return (
        
                isParent ? <ParentView fontsLoaded={fontsLoaded}/> :  <ChildsView />
    
    )
}
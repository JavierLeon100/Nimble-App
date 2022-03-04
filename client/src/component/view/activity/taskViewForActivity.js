import EachTask from "../../listItems/tasks/EachTasks"
import {FlatList} from "native-base"

const exampleArray = ["Sweeping", "GameBoy","sweeeee", "playstation", "goooooood"]

export default function TaskViewForActivity(){
    // const mapTasks = exampleArray.map(task=><EachTask task={task}/>)
    return(
        <>
        <FlatList data={exampleArray} renderItem={({item})=><EachTask task={item}/>}/>
        </>  
    )
} 
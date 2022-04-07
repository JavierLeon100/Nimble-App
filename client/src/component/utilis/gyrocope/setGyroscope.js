import { Accelerometer } from 'expo-sensors';

// template to use gyro in react component
// const [gyroValue, setGyroValue] = useState({
//     x : 0,
//     y : 0,
//     z : 0,
// })
// const {x, y, z} = gyroValue
// const [startGyro, setStartGyro] = useState(false)

export const handleGyro = async (setStartGyro, startGyro, setGyroValue)=>{
    await Accelerometer.isAvailableAsync()
    if(!startGyro){
        Accelerometer.addListener(data=>setGyroValue(data))
    } else {
        Accelerometer.removeAllListeners()
    }
    Accelerometer.setUpdateInterval(2000)
    setStartGyro(prev=>!prev)
}


export const roundNum = (num)=>{
    return Math.round(num * 100) / 100
}
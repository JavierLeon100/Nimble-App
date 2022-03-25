import { Button } from "native-base"
import SvgUri from "react-native-svg-uri-updated"

export const PointButton = ({btnText, pointIcon})=>{

    return (
        <>
        <Button >
            {btnText}
            {!pointIcon ? null : <SvgUri />}
        </Button>
        </>
    )
}
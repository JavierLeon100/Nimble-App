import SvgUri from 'react-native-svg-uri-updated';

export default function({h, w}){
    return <SvgUri source={require("../../../../assets/profileIcons/ProfileIcon.svg")} height={h ? h : 50} width={w ? w : 50}/>
}
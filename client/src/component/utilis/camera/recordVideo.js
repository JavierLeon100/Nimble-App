export const startRecordVideo = async (videoRef, setVideo)=>{
    try {
        const {uri} = await videoRef.current.recordAsync({ quality: '1080p'})
        alert(uri)
        setVideo(uri)
    } catch (error) {
        alert(error)
    } 
}

export const stopRecordVideo = (videoRef)=>{
       
    const stopRec = videoRef.current.stopRecording()
}


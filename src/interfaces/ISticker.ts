

type LoopType = boolean
type URLType = string
type SizeType = number | string


const enum VideoExtensions {
    WEBM = 'webm',
    MP4 = 'mp4',
}

const enum ImageExtensions {
    GIF = 'gif',
    PNG = 'png',
    WEBP = 'webp',
    JPG = 'jpg',
    JPEG = 'jpeg',
    ICO = 'ico',
}


interface IStickerExtensionTypes {
    [key: string]: CallableFunction
}


interface IStickerProps {
    loop?: LoopType
    src: URLType
    width?: SizeType
    height?: SizeType
}

interface IStickerState {

}


export type {
    IStickerExtensionTypes, 
    IStickerProps, 
    IStickerState, 
    LoopType, 
    URLType, 
    SizeType, 
    ImageExtensions, 
    VideoExtensions
}
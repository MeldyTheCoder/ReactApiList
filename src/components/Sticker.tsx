import React from "react";
import assert from 'assert';
import {IStickerExtensionTypes, IStickerProps, IStickerState, LoopType, SizeType, URLType} from '../interfaces/ISticker';


class Sticker extends React.Component<IStickerProps, IStickerState> {
    extensions: IStickerExtensionTypes
    loop: LoopType
    width: SizeType
    height: SizeType

    constructor(props: IStickerProps) {
        super(props)

        this.extensions = {
            webm: this.__getVideoPlayer,
            mp4: this.__getVideoPlayer,

            gif: this.__getImageView,
            png: this.__getImageView,
            webp: this.__getImageView,
            jpg: this.__getImageView,
            jpeg: this.__getImageView,
            ico: this.__getImageView,
        }

        this.loop = this.props.loop || true
        this.width = this.props.width || 100
        this.height = this.props.height || 100

        assert(this.props.src, "Source URL not defined")
    }

    render(): React.ReactElement {
        const fileUrl: URLType = this.getFileUrl()
        const fileExtension: string | undefined  = this.getFileExtension()
        const width: SizeType = this.width
        const height: SizeType = this.height
        
        assert(fileExtension, 'File extension not found!')

        return this.extensions[fileExtension](fileUrl, width, height)
    }

    getFileUrl(): URLType {
        return this.props.src
    }

    getFileExtension(fileUrl: URLType | null = null): string | undefined {
        const file = fileUrl || this.getFileUrl()
        return file.split('.').pop()
    }

    __getVideoPlayer(fileUrl: URLType, width: SizeType = 100, height: SizeType = 100): React.ReactElement {
        return (
            <video width={width} height={height} autoPlay controls={false} loop muted>
                <source src={fileUrl}></source>
            </video>
        )
    }

    __getImageView(fileUrl: URLType, width: SizeType | undefined = 100, heigth: SizeType | undefined = 100): React.ReactElement {
        return (
            <img src={fileUrl} width={width} height={heigth} alt="Sticker" />
        )
    }
}

export default Sticker
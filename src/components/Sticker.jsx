import React from "react";
import assert from 'assert';


class Sticker extends React.Component {
    constructor(props) {
        super(props)

        // this.props.loop - Looping video player
        // this.props.src - Media url
        // this.props.width - Width of player
        // this.props.heigth - height of player

        this.Extensions = {
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

    render() {
        const fileUrl = this.getFileUrl()
        const fileExtension = this.getFileExtension()
        const width = this.width
        const height = this.height

        return this.Extensions[fileExtension](fileUrl, width, height)
    }

    getFileUrl() {
        return this.props.src
    }

    getFileExtension(fileUrl=null) {
        const file = fileUrl || this.getFileUrl()
        return file.split('.').pop()
    }

    __getVideoPlayer(fileUrl, width=100, height=100) {
        return (
            <video width={width} height={height} autoPlay controls={false} loop muted>
                <source src={fileUrl}></source>
            </video>
        )
    }

    __getImageView(fileUrl, width=100, heigth=100) {
        return (
            <image src={fileUrl} width={width} height={heigth}></image>
        )
    }
}

export default Sticker
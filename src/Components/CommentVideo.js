import React from 'react';

export default function CommentVideo({ commentVideoObj }) {

    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
        }}>
            <video
                width="500"
                height='500'
                autoPlay
                loop
                muted={true}
                src={commentVideoObj.videoUrl}
                style={{ minHeight: "100%" }}></video>
        </div>
    )
}
import React from "react";
import { Image } from "antd";

export default function TrackCard(props) {
  const trackInfo = props.track;
const isShowRemoveBtn = props.isShowRemoveBtn;
  const trackName = trackInfo.name;
  const thumbnail = trackInfo.album.images.sort((a, b) => a.width - b.width)[0];

  const handleRemoveClick = ($event) => {
      props.handleRemoveTrack(props.track.uri)
  }

  return (
    <div>
      <p>{trackName}</p>
      <Image width={thumbnail.width} src={thumbnail.url} />
      {
          isShowRemoveBtn ?
          <a href="#" onClick={handleRemoveClick}>Remove</a> : null
      }
    </div>
  );
}

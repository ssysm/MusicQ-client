import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { message } from "antd";
import RoomService from "../services/RoomService";
import config from "../Constants";
import SearchBar from "../components/SearchBar";
import SearchService from "../services/SearchService";
import TrackCard from "../components/TrackCard";
export default function RoomPage(props) {
  const { id } = useParams();
  const roomID = id;
  const history = useHistory();
  const [queueList, setQueueList] = useState([]);
  const [hostUID, setHostUID] = useState('');
  const [createdAt, setCreatedAt] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const roomService = new RoomService();
  const searchService = new SearchService();

  useEffect(() => {
    fetchRoomDetail(roomID);
    const socket = socketIOClient(config.url.API_BASE + "/room-io");
    socket.on("refresh control", (data) => {
      if (data.roomID === roomID) {
        fetchRoomDetail(roomID);
      }
    });
  }, [roomID]);

  const fetchRoomDetail = (roomID) => {
    setIsPosting(true);
    roomService
      .getRoomDetail(roomID)
      .then(async (data) => {
        setIsPosting(false);
        if (data.startedAt == null) {
          history.replace("/404");
          return;
        }
        setCreatedAt(data.startedAt);
        setHostUID(data.hostUID);
        const tempQueue = data.queue;
        const promiseQueueList = tempQueue.map(async (track) => {
          const trackInfoRes = await searchService.trackLookup(track);
          const trackInfo = trackInfoRes.result;
          return trackInfo;
        });
        const resolvedQueueList = await Promise.all(promiseQueueList);
        setQueueList(resolvedQueueList);
      })
      .catch((e) => {
        setIsPosting(false);
        message.error("Errored while getting room detail: " + e.message);
      });
  };

  const handleEnQueue = (trackURI) => {
    setIsPosting(true);
    roomService.addTrackToQueue(trackURI)
      .then(data => {
        setIsPosting(false);
      })
      .catch(e => {
        setIsPosting(false);
        message.error("Errored while putting track into the queue: " + e.message);
      })
  };

  const handleRemoveTrack = async (trackURI) => {
    await roomService.removeTrackFromQueue(trackURI);
  };

  const queueListElm = () => {
    return queueList.map((track) => {
      return (
        <TrackCard track={track}
          isShowRemoveBtn={hostUID === localStorage.getItem('uid')}
          handleRemoveTrack={handleRemoveTrack}
        />
      );
    });
  };

  return (
    <div>
      <p>Room Page</p>
      <p>Room ID {roomID}</p>
      <p>Host ID {hostUID}</p>
      {
        hostUID === localStorage.getItem('uid') ?
          <a href="/host/">Host Control</a> : null
      }
      <SearchBar handleEnQueue={handleEnQueue} />
      <div>
        {queueListElm()}
      </div>
    </div>
  );
}

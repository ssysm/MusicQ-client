import React, { useEffect, useState } from "react";
import HostService from "../services/HostService";

export default function HostPage(props) {
  const stay = 1;
  const [devices, setDevices] = useState([]);
  const [useDeviceIdx, setUseDeviceIdx] = useState(0);
  const hostService = new HostService();

  useEffect(() => {
    getDevices();
  }, [stay]);

  const getDevices = () => {
    hostService.getDevices().then((data) => {
      setDevices(data.devices);
    });
  };
  
  const handlePlay = async ()=> {
    await hostService.play();
  }

  const handlePause = async () =>{
    await hostService.pause();
  }

  const handleSkip = async () => {
    await hostService.skipToNext();
  }

  const handleRewind = async () => {
    await hostService.skipToPervious();
  }

  return (
    <div>
      <div>
        <button onClick={getDevices}>Get Devices</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handleSkip}>Skip</button>
        <button onClick={handleRewind}>Rewind</button>
      </div>
      <div>
        <p>Available Devices</p>
        <ul>
          {devices.map((device) => (
            <li>
              <span>{device.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

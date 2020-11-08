import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import HostService from "../services/HostService";

export default function HostPage(props) {
  const stay = 1;
  const [devices, setDevices] = useState([]);
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

  const getButtonDisabled = () => {
    return devices.length === 0;
  };

  return (
    <div>
      <div>
        <Button onClick={getDevices}>Get Devices</Button>
        <Button onClick={handlePause} disabled={getButtonDisabled()}>Pause</Button>
        <Button onClick={handlePlay} disabled={getButtonDisabled()}>Play</Button>
        <Button onClick={handleSkip} disabled={getButtonDisabled()}>Skip</Button>
        <Button onClick={handleRewind} disabled={getButtonDisabled()}>Rewind</Button>
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

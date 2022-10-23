import React, { useEffect } from 'react';
import AlertCard from './components/alert-card/AlertCard';
import DropDown from './components/dropdown/DropDown';
import Navbar from './components/navbar/Navbar';
import back from './assets/svg/back.svg';
import Header from './components/header/Header';
import Output from './components/output/Output';
import Button from './components/button/Button';

export default function App() {
  // for all alerts
  const [data, setData] = React.useState([]);
  const [showData, setShowData] = React.useState([]);

  // for filter ddl
  const [fliterValue, setFilterValue] = React.useState('');
  const filterOptions = [
    {
      name: 'All Machine',
      value: '',
    },
    {
      name: 'CNC Machine',
      value: 'CNC Machine',
    },
    {
      name: 'Milling Machine',
      value: 'Milling Machine',
    }];
  const onChangeFilterDropDown = (event) => {
    setFilterValue(event.target.value);
    if (!event.target.value) {
      setShowData(data);
      setSelectedAlertId(data[0].id);
      setSelectedAlert(data[0]);

      setReason(data[0].reason ? data[0].reason : '');
      setAction(data[0].action ? data[0].action : '');
      setComment(data[0].comment ? data[0].comment : '');
    } else {
      const tempData = data.filter((item) => item.machine === event.target.value);
      setShowData(tempData);
      setSelectedAlertId(tempData[0].id);
      setSelectedAlert(tempData[0]);

      setReason(tempData[0].reason ? tempData[0].reason : '');
      setAction(tempData[0].action ? tempData[0].action : '');
      setComment(tempData[0].comment ? tempData[0].comment : '');
    }
  }

  // for suspected reason
  const [reason, setReason] = React.useState('Unknown Anomaly');
  const reasonOptions = [
    {
      name: 'Unknown Anomaly',
      value: 'Unknown Anomaly'
    },
    {
      name: 'Known Anomaly',
      value: 'Known Anomaly'
    },
  ];
  const onChangeReasonDropDown = (event) => {
    setReason(event.target.value);
  }

  // for action requied
  const [action, setAction] = React.useState('');
  const actions = [
    {
      name: 'Detection',
      value: 'Detection'
    }
  ];
  const onChangeActionDropDown = (event) => {
    setAction(event.target.value);
  }

  // for comment
  const [comment, setComment] = React.useState('');
  const onChangeComment = (event) => {
    setComment(event.target.value);
  }

  // for selection alert
  const [selectedAlertId, setSelectedAlertId] = React.useState();
  const [selectedAlert, setSelectedAlert] = React.useState();
  const onClickAlert = (id) => {
    const tempAlert = data.find((item) => item.id === id);
    setSelectedAlertId(id);
    setSelectedAlert(tempAlert);
    setReason(tempAlert.reason ? tempAlert.reason : '');
    setAction(tempAlert.action ? tempAlert.action : '');
    setComment(tempAlert.comment ? tempAlert.comment : '');

    if (selectedAlert.is_new) {
      const newData = data.map(item => {
        if (item.id === id) {
          return { ...item, is_new: false }
        }
        return item;
      })
      setData(newData);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_new: false })
      };

      fetch(`${process.env.REACT_APP_API_URL}/alert/${id}/update`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    }
  }

  // for updating alert
  const onClickUpdate = () => {
    const newData = data.map(item => {
      if (item.id === selectedAlertId) {
        return { ...item, reason: reason, action: action, comment: comment }
      }
      return item;
    })
    setData(newData);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: reason, action: action, comment: comment })
    };

    fetch(`${process.env.REACT_APP_API_URL}/alert/${selectedAlertId}/update`, requestOptions)
      .then(response => response.json())
      .then(data => alert(data.message));
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/alerts`)
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.length) {
          setData(jsonData);
          setShowData(jsonData);
          setSelectedAlertId(jsonData[0].id);
          setSelectedAlert(jsonData[0]);

          setReason(jsonData[0].reason ? jsonData[0].reason : '');
          setAction(jsonData[0].action ? jsonData[0].action : '');
          setComment(jsonData[0].comment ? jsonData[0].comment : '');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (<div className='container mx-auto text-gray-600'>
    <Navbar></Navbar>
    <div className='bg-white border rounded m-4'>
      <div className='px-3 py-1'>
        <div className='flex w-[200px]'>
          <DropDown
            onChange={onChangeFilterDropDown}
            placeholder={'Filter Machine'}
            value={fliterValue}
            options={filterOptions}></DropDown>
        </div>
      </div>
      <hr></hr>
      <div className='flex flex-wrap '>

        <div className='min-h-screen border-r w-1/5'>
          <div className='px-8 py-2.5 border-b'>
            <a href='#' className='flex hover:opacity-50 '>
              <img src={back} className='mr-3 h-6 py-1.5' alt='back' />
              <span>Back</span>
            </a>
          </div>
          <div className='flex text-xs px-3 py-2 border-b '>
            <span className='pr-3'>{data.length} Alerts</span>
            <div className='text-white rounded-full px-3 pb-[2px] bg-blue-500'>
              <span>{data.filter((item) => item.is_new).length} New</span>
            </div>
          </div>
          <div className='px-3 py-2'>
            {showData.map((item, idx) => {
              return (
                <div className='flex pb-2' key={idx}>
                  <AlertCard data={item} onClick={onClickAlert} isSelected={item.id === selectedAlertId}></AlertCard>
                </div>
              )
            })}
          </div>
        </div>

        {selectedAlertId ? (<div className='p-3 w-4/5'>
          <Header data={selectedAlert}></Header>
          <div className='flex'>
            <div className='w-2/5'>
              <Output
                title={'Anomaly Machine Output'}
                data={`${process.env.REACT_APP_API_URL}/public/${selectedAlert.sound_clip}`}></Output>
            </div>
            <div className='w-2/5'>
              <Output
                title={'Normal Machine Output'}
                data={`${process.env.REACT_APP_API_URL}/public/${selectedAlert.sound_clip}`}></Output>
            </div>
          </div>
          <div className='w-full pt-7 px-2'>
            <div className='grid pt-1'>
              <label className='text-sm font-semibold'>Equipment</label>
              <label className='text-sm'>{selectedAlert?.machine}</label>
            </div>
            <div className='grid pt-1.5'>
              <label className='text-sm font-semibold'>Suspected Reason</label>
              <div className='w-56 pt-1'>
                <DropDown
                  onChange={onChangeReasonDropDown}
                  value={reason}
                  options={reasonOptions}></DropDown>
              </div>
            </div>
            <div className='grid pt-1.5'>
              <label className='text-sm font-semibold'>Action Required</label>
              <div className='w-56 pt-1'>
                <DropDown
                  onChange={onChangeActionDropDown}
                  value={action}
                  placeholder={'Select Action'}
                  options={actions}></DropDown>
              </div>
            </div>
            <div className='grid pt-7'>
              <label className='text-sm font-semibold'>Comments</label>
              <div className='w-3/5 pt-1 h-24'>
                <textarea
                  value={comment}
                  onChange={onChangeComment}
                  className='text-sm border border-gray-300 rounded outline-none p-2 w-full h-full'></textarea>
              </div>
            </div>
            <div className='pt-7'>
              <Button label={'Update'} onClick={onClickUpdate}></Button>
            </div>
          </div>
        </div>) : <></>}
      </div>
    </div>
  </div>);
}
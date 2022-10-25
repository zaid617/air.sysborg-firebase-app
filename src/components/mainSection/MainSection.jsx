import React from 'react'
import "./mainSection.css"
import moment from 'moment';

export default function MainSection(props) {
    

  return (
    
    <div className='mainSection'>
      <div className="box1">
        <div><strong >192.168.100</strong></div>
        <div className='date'>{moment(props.date).fromNow()}</div>
        <div ><input className='red' readOnly type="text" onClick={() => props.delete(props.id)} value={"Delete"} /></div>
      </div>

      <div className="box2">
        <p>{props.text}</p>
      </div>
    </div>
  )
}

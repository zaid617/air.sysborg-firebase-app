import "./Input.css"
import moment from 'moment';

export default function Input(props) {

    const link = "https://"


    return (
        <div className="container">


            <hr />

            <form className='input' onSubmit={props.idSub}>
                <div className="inputs"><input type="text" onChange={(e) => { props.setClassID(e.target.value) }} value={props.classID} placeholder='Class ID' className='height first-input' /><button type="submit" className="classBtn" id="classBtn">
                    &#10003;</button></div>

                <div className="inputs second">

                    <input type="text" placeholder='Enter Any Text Or Link' onChange={(e) => { props.setText(e.target.value) }} value={props.text} className='height Assignment' />

                    <button className='height btn btn-primary m-l3' onClick={props.submitHandler}>Submit</button>
                </div>

                <div className="inputs">
                    <button className='height btn btn-primary last' onClick={props.deleteHandler}>Delete all</button>
                </div>
            </form>


            <hr />

            <p className="error" id="error">Enter Your Class Id !</p>

            {(props.textArr.length === 0) ? null : (
                <div className="mainBox">

                    {
                        props.textArr.map((elem, i) => {

                            return <div className='mainSection' key={i}>
                                <div className="box1">
                                    <div><strong >{elem.ip}</strong></div>
                                    <div className='date'>{moment(elem.date).fromNow()}</div>
                                    <div ><input className='red' readOnly type="text" onClick={() => props.deleteItem(elem.id, elem.ip)} value={"Delete"} /></div>
                                </div>

                                <div className="box2">
                                    {(elem.assignment.slice(0,8)===link)? <p><a href={elem.assignment} rel="noreferrer" target="_blank">{elem.assignment}</a></p>:<p>{elem.assignment}</p>}              
                                </div>
                            </div>


                        })
                    }

                </div>)

            }

        </div>
    )
}

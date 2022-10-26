import MainSection from "../mainSection/MainSection"
import "./Input.css"

export default function Input(props) {




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
                            return <MainSection
                                key={i}
                                id={i}
                                text={elem.assignment}
                                date={elem.date}
                                ip={elem.ip}
                            />
                        })
                    }

                </div>)

            }

        </div>
    )
}

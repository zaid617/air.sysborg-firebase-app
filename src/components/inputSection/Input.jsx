import MainSection from "../mainSection/MainSection"
import "./Input.css"

export default function Input(props) {

    


    return (
        <div className="container">

            
      <hr/>

        <form className='input' >
            <div className="inputs"><input type="text" placeholder='Class ID' className='height first-input' /></div>

            <div className="inputs second">

                <input type="text"  placeholder='Enter Any Text Or Link' onChange={(e)=>{props.setText(e.target.value)}} value={props.text} className='height Assignment' />

            <button className='height btn btn-primary m-l3' onClick={props.submitHandler}>Submit</button>
            </div>

            <div className="inputs">
                <button className='height btn btn-primary last' onClick={props.deleteHandler}>Delete all</button>
            </div>
        </form>

        <hr />

        <div className="mainBox">

        {
            props.textArr.map((elem,i)=>{
             return <MainSection 
                key={i}
                id={i}
                text={elem.assignment}
                date = {elem.date}
                />
            })
        }

        </div>

        </div>
    )
}

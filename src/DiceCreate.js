import React from 'react'
import DiceProp from './DiceProp'

export default function DiceAdd(props) {


    let [dice, setDice] = React.useState([{}])
    let [min, setMin] = React.useState("number")
    let [max, setMax] = React.useState("number")


    const onClickHandler = (event) => {

        let tempDice = [...dice]
        tempDice.push({
            min, max
        })
        setDice(tempDice)
    }
    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'min':
                setMin(event.target.value)
                break
            case 'max':
                setMax(event.target.value)
                break
            default:
        }
    }

    return (
        <div>
            <div id="header">
                <h1>Create Your Dice Here!</h1>

            </div>
            <div id="create">

                <input onChange={onChangeHandler} min="1" type="number" value={min} name="min" placeholder="Minimum" /><br></br>
                <input onChange={onChangeHandler} max="100" type="number" value={max} name="max" placeholder="Maximum"/>
                <button title="Solid Button" onClick={onClickHandler}>Add a Die!</button>


            </div>
            <div>
                                                    {
                        dice.map(die => {
                            return (
                              
                                   <DiceProp die={die}></DiceProp>
                                
                            )
                        })
                    }
                
            </div>
        </div>
    )

}


import React from 'react'

export default function DiceProp(props) {

    const [roll, setRoll] = React.useState("")

    const rollDice = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
        
    }
    const onClickHandler = () => {

        setRoll(rollDice(props.die.min, props.die.max))
        

    }

    return (
        <div>
            Min {props.die.min} Max {props.die.max}<br></br>
            <br></br>
            <button onClick={onClickHandler}>Roll the Dice</button><br></br>
            {roll}
        </div>
    )

}

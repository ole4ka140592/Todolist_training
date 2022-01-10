import { Button } from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    callBack: (title: string)=> void
}

export const AddItemForm=React.memo((props: AddItemFormPropsType)=> {



    let [title, setTitle] = useState("")

    let [error, setError]=useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError("")
        if (e.key === "Enter" && title.trim() !== "") {
            props.callBack(title)
            setTitle("")
        }
    }

    const onClickAddTaskHandler = (title: string) => {
        if (title.trim() !== "") {
            props.callBack(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ""}
            />
            {/*<button onClick={() => onClickAddTaskHandler(title)}>+</button>*/}
            <Button variant="outlined" size="small" onClick={() => onClickAddTaskHandler(title)}>+</Button>
            {error? <div className='error-message'>{error}</div> : ""}
        </div>
    )
})
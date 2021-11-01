import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    callBack: (title: string)=> void
}

export const AddItemForm=(props: AddItemFormPropsType)=> {

    let [title, setTitle] = useState("")

    let [error, setError]=useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && title.trim() !== "") {
            props.callBack(title)
            setTitle("")
        } else {
            setError("Title is required")
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
            <button onClick={() => onClickAddTaskHandler(title)}>+</button>
            {error? <div className='error-message'>{error}</div> : ""}
        </div>
    )
}
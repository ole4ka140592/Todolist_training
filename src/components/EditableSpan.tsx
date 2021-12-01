import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    console.log("EditableSpan")

    let [editMode, setEditMode] = useState(false)
    let [titleInput, setTitleInput] = useState(props.title)

    const editModeTrueHandler = () => {
        setEditMode(true)
    }

    const editModeFalseHandler = () => {
        setEditMode(false)
        props.callBack(titleInput)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.callBack(titleInput)
            setEditMode(false)
        }
    }

    return (
        editMode
            ? <input value={titleInput}
                     onChange={onChangeHandler}
                     autoFocus
                     onBlur={editModeFalseHandler}
                onKeyPress={onKeyPressHandler}

            />
            : <span onDoubleClick={editModeTrueHandler}>{props.title}</span>

    )
})
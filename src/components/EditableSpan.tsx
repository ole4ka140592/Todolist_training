import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [titleInput, setTitleInput] = useState(props.title)

    const editModeTrueHandler = () => {
        setEditMode(true)
    }

    const editModeFalseHandler = () => {
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
        props.callBack(titleInput)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" ) {
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
}
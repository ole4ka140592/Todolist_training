import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton} from "@mui/material";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    callBack: (title: string) => void
    entityStatus?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {


    let [title, setTitle] = useState("")

    let [error, setError] = useState<null | string>(null)

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
        }
        else {
            setError("Title is required")
        }
    }

    return (
        <div>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*    className={error ? 'error' : ""}*/}
            {/*/>*/}

            <TextField id="outlined-basic"
                       label="Title"
                       variant="outlined"
                       size="small"
                       helperText={error}
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ""}
                       disabled={props.entityStatus}
            />

            {/*<button onClick={() => onClickAddTaskHandler(title)}>+</button>*/}
            {/*<Button*/}
            {/*    disabled={props.entityStatus}*/}
            {/*    variant="outlined"*/}
            {/*    style={{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px"}}*/}
            {/*    onClick={() => onClickAddTaskHandler(title)}>+</Button>*/}
            <IconButton color="primary"
                        onClick={() => onClickAddTaskHandler(title)}
                        disabled={props.entityStatus}>
                <AddBox/>
            </IconButton>
            {/*{error ? <div className='error-message'>{error}</div> : ""}*/}
        </div>
    )
})
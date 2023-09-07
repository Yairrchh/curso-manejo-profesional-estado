import React from "react";

const SECURITY_CODE = 'paradigma'

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // const [value, setValue] = React.useState('');
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false)

    const onConfirm = () => {
        dispatch({type: actionTypes.confirm});
    }

    const onError = () => {
        dispatch({type: actionTypes.error})
    }

    const onWrite = (event) => {
        dispatch({type: actionTypes.write, payload: event.target.value})
    }

    const onFindOut = () => {
        dispatch({type: actionTypes.findOut})
    }

    const onDelete = () => {
        dispatch({type: 'DELETE'});
    }

    const onRestore = () => {
        dispatch({type: 'RESTORE'})
    }

    console.log(state)


    React.useEffect(() =>{
        console.log('start effect')

        if(!!state.loading) {
            setTimeout(() => {
                console.log('start validation')

                if(state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log('end validation')
            },3000);
        }

        console.log('end effect')
    }, [state.loading])

    if(!state.delete && !state.confirmed) {
        return (
            <div>
                <h2>Delete {name}</h2>

                <p>Please, type the security code</p>

                {(state.error && !state.loading)&& (
                    <p>Error, the code it's incorrect</p>
                )}

                {state.loading && (
                    <p>loading...</p>
                )}

                <input placeholder="code of security"
                value={state.value}
                onChange={(event) => {
                    onWrite(event)
                   // onWrite(event.target.value);
                }}
                />
                <button
                    onClick={() => onFindOut()}
                >Find out</button>
            </div>
            )
    } else if(state.confirmed && !state.delete) {
        return(
            <React.Fragment>
                <p>Are you sure you want to delete?</p>
                <button onClick={() => {
                    onDelete();
                }}>Yes, Delete</button>
                <button onClick={() => {
                    onRestore();
                }}>No, go back</button>
            </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                <p>Delete Successfully</p>
            <button onClick={() => {
                onRestore();
            }}>Retrieve useState</button>
            </React.Fragment>
        )
    }

}
const initialState = {
    value: '',
    error: false,
    loading: false,
    delete: false,
    confirmed: false,
}

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    delete: 'DELETE',
    findOut: 'FIND_OUT',
    restore: 'RESTORE',

}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {...state, loading: false, error: false, confirmed: true},
    [actionTypes.error]: {...state, error: true, loading: false},
    [actionTypes.write]: {...state, value: payload},
    [actionTypes.findOut]: {...state, loading: true},
    [actionTypes.delete]: {...state, delete: true},
    [actionTypes.restore]: {...state, confirmed: false, delete: false, value: ''}
})

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return {
            ...state,
        }
    }
}

export { UseReducer };
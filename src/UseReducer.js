import React from "react";

const SECURITY_CODE = 'paradigma'

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // const [value, setValue] = React.useState('');
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false)

    console.log(state)


    React.useEffect(() =>{
        console.log('start effect')

        if(!!state.loading) {
            setTimeout(() => {
                console.log('start validation')

                if(state.value === SECURITY_CODE) {
                    dispatch({type: 'CONFIRM'});
                } else {
                    dispatch({type: 'ERROR'})
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
                    dispatch({type: 'WRITE', payload: event.target.value})
                   // onWrite(event.target.value);
                }}
                />
                <button
                    onClick={() => dispatch({type: 'FIND_OUT'})}
                >Find out</button>
            </div>
            )
    } else if(state.confirmed && !state.delete) {
        return(
            <React.Fragment>
                <p>Are you sure you want to delete?</p>
                <button onClick={() => {
                    dispatch({type: 'DELETE'});
                }}>Yes, Delete</button>
                <button onClick={() => {
                    dispatch({type: 'RESTORE'});
                }}>No, go back</button>
            </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                <p>Delete Successfully</p>
            <button onClick={() => {
                dispatch({type: 'RESTORE'});
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

const reducerObject = (state, payload) => ({
    'CONFIRM': {...state, loading: false, error: false, confirmed: true},
    'ERROR': {...state, error: true, loading: false},
    'WRITE': {...state, value: payload},
    'FIND_OUT': {...state, loading: true},
    'DELETE': {...state, delete: true},
    'RESTORE': {...state, confirmed: false, delete: false, value: ''}
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
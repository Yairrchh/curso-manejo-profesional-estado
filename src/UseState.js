import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        delete: false,
        confirmed: false,
    })

    // const [value, setValue] = React.useState('');
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false)

    console.log(state)

    const onConfirm = () => {
        setState({...state, loading: false, error: false, confirmed: true})
    }

    const onError = () => {
        setState({...state, error: true, loading:false})
    }

    const onWrite = (newValue) => {
        setState({...state, value: newValue})
    }

    const onFindOut = () => {
        setState({...state, loading: true})
    }

    const onDelete = () => {
        setState({...state, delete: true})
    }

    //Because it has almost the same functionality as the onRestore we are going to use a single function to have less code
    // const onNoDelete = () => {
    //     setState({...state, confirmed: false, value: ''})
    // }

    const onRestore = () => {
        setState({...state, confirmed: false, delete: false, value: ''})
    }

    React.useEffect(() =>{
        console.log('start effect')

        if(!!state.loading) {
            setTimeout(() => {
                console.log('start validation')

                if(state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError()
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
                    onWrite(event.target.value);
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

export {UseState};
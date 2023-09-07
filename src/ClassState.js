import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma'


class ClassState extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        }
    }

    // UNSAFE_componentWillMount() {
    //     console.log('WillMount')
    // }
    // componentDidMount() {
    //     console.log('DidMount')
    // }

    componentDidUpdate() {
        console.log('update')

        if(!!this.state.loading) {
            setTimeout(() => {
                console.log('start validation')

                if( SECURITY_CODE === this.state.value){
                    this.setState({loading: false, error:false})
                } else {
                    this.setState({error: true, loading:false})
                }
                console.log('end validation')
            },3000);
        }
    }

    render () {
    return (
        <div>
            <h2>Delete {this.props.name}</h2>

            <p>Please, type the security code</p>

            {(this.state.error && !this.state.loading) && (
                <p>Error, the code it's incorrect</p>
            )}

            {this.state.loading && (
                <Loading/>
            )}

            <input
            placeholder="code of security"
            value={this.state.value}
            onChange={(event) => {
                this.setState({value: event.target.value})
            }}
            ></input>
            <button
                onClick={() => this.setState({loading: true})}
            >find out</button>
        </div>
    )
    }
}

export {ClassState};
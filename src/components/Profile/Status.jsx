import s from './Profile.module.css'
import React from 'react'

export class Status extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
        // status: 'haloo'
    }

    activateEditMode = () => {
        console.log(this)
        this.setState({
            editMode: true
        })
    }



    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })

        this.props.updateStatus(this.state.status)
        // this.forceUpdate(); 
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
            console.log(this.state.status)
        }
        // alert(this.state.status)
    }

    render() {
        // console.log('render') 
        return (
            <div className={s.status}>
                {(!this.state.editMode)
                    ? <span onDoubleClick={this.activateEditMode}>
                        {this.state.status || 'put your status'}
                        {/* {this.state.status} */}
                    </span>
                    : <input autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onStatusChange} value={this.state.status} />}
            </div>
        )
    }
}

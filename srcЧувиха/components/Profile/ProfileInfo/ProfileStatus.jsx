import React from "react";
import styles from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false,
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={styles.statusBlock}>
                {!this.state.editMode &&
                    <div className={styles.status}>
                        <span onClick={this.activateEditMode}>
                            {this.props.status || 'not status'}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input className={styles.statusInput}
                               autoFocus={true}
                               onBlur={this.deactivateEditMode.bind(this)}
                               onChange={this.onStatusChange}
                               value={this.state.status}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;
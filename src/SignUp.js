import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStores';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';

class SignUp extends React.Component {

    render() {

        if (UserStore.loading) {
            return (
                <div className="app">
                    <div className='container'>
                        Loading...
              </div>
                </div>
            );
        }
        else {
            if (UserStore.isLoggedin) {
                return (
                    <div className="app">
                        <div className='container'>
                            Welcome {UserStore.username}
                            <SubmitButton
                                text={'Log out'}
                                disabled={false}
                                onClick={() => this.doLogout()}
                            />
                        </div>
                    </div>
                );
            }

            return (
                <div className="app">
                    <div className='container'>
                        <SubmitButton
                            text={'Sign up'}
                            disabled={true}
                            onClick={() => this.doLogout()}
                        />
                        <LoginForm />
                    </div>
                </div>
            );
        }
    }

}
export default SignUp;
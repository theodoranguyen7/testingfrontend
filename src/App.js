import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStores';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';
import SignUp from './SignUp';
// import { Router, Switch, Route } from "react-router-dom";


//import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  //add API here
  async compontentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    //api calls
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    }

    catch (e) {
      console.log(e);
    }
  }


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
              disabled={false}
              onClick={() =>  SignUp }
            />
            <LoginForm />
          </div>
        </div>
      );
    }
  }
}


export default observer(App);
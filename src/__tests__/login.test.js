import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  getByTestId
} from '@testing-library/react';
import Login from '../pages/login';
import FirebaseContext from '../context/firebase';
import { BrowserRouter as Router } from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('<Login />', () => {
  it('renders the login page with a form submittion and logs the user in', () => {
    const succededToLogin = jest.fn(() => Promise.resolve('I am signed in!'));

    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succededToLogin
      }))
    };
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );

    expect(document.title).toEqual('Login - SnapShot');

    fireEvent.change(getByPlaceholderText('Email address'), {
      target: {
        value: 'tester@gmail.com'
      }
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: {
        value: 'tester'
      }
    });
    fireEvent.submit(getByTestId('login'));
  });
});

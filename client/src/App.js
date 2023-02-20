import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';
import React, { Fragment } from 'react';

import './App.css';

function App() {
    return (
        <Fragment>
            <div className='flex flex-col space-y-4 h-screen'>
                <h1 className='text-center text-2xl font-bold'>Todo</h1>

                <InputTodo />
                <ListTodo />
            </div>
            <footer className='mt-5 footer footer-center p-4 bg-base-300 inset-x-0 bottom-0 ext-base-content relative'>
                <div>
                    <p>
                        My website build{' '}
                        <a
                            className='hover:underline font-light hover:font-bold underline-offset-2'
                            href='https://github.com/HelloYesNo'
                        >
                            @github
                        </a>
                    </p>
                </div>
            </footer>
        </Fragment>
    );
}

export default App;

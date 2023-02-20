import React, { Fragment, useState } from 'react';

const InputTodo = () => {
    const [description, setDescription] = useState('');
    const [empty, setEmpty] = useState(false);

    const onSubmitForm = async (e) => {
        try {
            const body = { description };
            const response = await fetch('http://localhost:4000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            console.log(response);
            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    };

    const addRandomTodo = async () => {
        try {
            const response = await fetch('http://localhost:4000/todos/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response);
            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div className='flex justify-center'>
                <textarea
                    type='text'
                    placeholder='Add Todo...'
                    className='input input-ghost w-full max-w-xs self-center'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    className='btn btn-primary'
                    onClick={() => {
                        if (description === '') {
                            setEmpty(true);
                        } else {
                            onSubmitForm(description);
                        }
                    }}
                >
                    Add
                </button>

                <button
                    className='btn btn-secondary'
                    onClick={() => addRandomTodo()}
                >
                    Random Task
                </button>
            </div>
            {empty ? (
                <div className='alert alert-warning shadow-lg relative inset-0'>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='stroke-current flex-shrink-0 h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                        </svg>
                        <span>Warning: Invalid email address!</span>
                        <button
                            className='btn btn-sm btn-circle'
                            onClick={() => setEmpty(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default InputTodo;

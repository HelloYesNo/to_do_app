// Description: This component is used to edit a todo

import React, { Fragment, useState, useEffect } from 'react';

const EditTodo = ({ todo }) => {
    useEffect(() => {
        setDescription(todo.description);
    }, []);

    const [description, setDescription] = useState(todo.description);

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch(`http://localhost:4000/todos/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <span>{todo.id}</span>
            <div className='input-group justify-between'>
                <div className='p-5 whitespace-normal'>
                    <p>{description}</p>
                </div>
            </div>
            {/* <textarea
                type='text'
                className='input input-ghost w-full max-w-xs'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /> */}
            <button
                className='w-20 btn btn-square self-center'
                onClick={updateDescription}
            >
                Edit
            </button>
        </Fragment>
    );
};

export default EditTodo;

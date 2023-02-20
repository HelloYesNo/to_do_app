// Description: This component is used to edit a todo

import React, { Fragment, useState, useEffect } from 'react';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        setDescription(todo.description);
    }, []);

    const updateDescription = async () => {
        try {
            const body = { description };
            await fetch(`http://localhost:4000/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(body),
            });
            return setEdit(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <span>{todo.id}</span>
            {edit ? (
                <div className='input-group justify-between'>
                    <div className='grow p-5 whitespace-normal'>
                        <p>{description}</p>
                    </div>
                    <button
                        className='w-20 btn btn-square self-center'
                        onClick={() => setEdit(false)}
                    >
                        Edit
                    </button>
                </div>
            ) : (
                <div className='input-group justify-between'>
                    <div className='grow p-5 whitespace-normal'>
                        <textarea
                            type='text'
                            className='input input-ghost w-full max-w-xs'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button
                        className='w-20 btn btn-square self-center'
                        onClick={() => updateDescription()}
                    >
                        Edit
                    </button>
                </div>
            )}
        </Fragment>
    );
};

export default EditTodo;

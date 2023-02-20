import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    const deleteTdo = async (id) => {
        try {
            await fetch(`http://localhost:4000/todos/${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:4000/todos');
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <div className='flex justify-center'>
                <div className='flex flex-col space-y-4 w-9/12 max-w-screen-lg'>
                    <div className='p-5 rounded-lg bg-neutral text-neutral-content'>
                        <div className='flex justify-between'>
                            <h2 className='pr-5 pl-5 text-center'>ID</h2>
                            <h2 className='pl-5 grow'>Description</h2>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        {todos.map((todo) => (
                            <div
                                key={todo.id}
                                className='flex p-5 rounded-lg flex-col-reverse bg-neutral text-neutral-content'
                            >
                                <div>
                                    <div className='form-control'>
                                        <div className='input-group justify-between'>
                                            <EditTodo todo={todo} />
                                            <button
                                                className='w-20 btn btn-warning self-center'
                                                onClick={() =>
                                                    deleteTdo(todo.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ListTodo;

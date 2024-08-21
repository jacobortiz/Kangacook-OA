'use client'

import React, {Suspense, useState} from 'react'

const user = {
    name: 'Jacob Ortiz',
    image_size: 300,
}

async function Image() {
    const data = await fetch('http://localhost:8000/api/items/5/', {
        cache: 'force-cache',
    }).then((res) => res.json())
    return data
}

export default function Home() {
    const [todos, setTodos] = useState<string[]>([])
    const [newTodo, setNewTodo] = useState('')
    const [image, setImage] = useState<string>('')

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, newTodo])
            setNewTodo('')
        }
    }

    const handleDeleteTodo = (index: number) => {
        const updatedTodos = todos.filter((_, i) => i !== index)
        setTodos(updatedTodos)
    }

    const image_url = Image()
    image_url.then((data) => {
        setImage(data.description)
    })

    return (
        <div>
            Welcome to my app
            <h1>{user.name}</h1>
            <Suspense fallback={<div>loading...............</div>}>
                {image && (
                    <img
                        src={image}
                        alt='Fetched Image'
                        width={user.image_size}
                        height={user.image_size}
                    />
                )}
            </Suspense>
            <div style={{marginBottom: '10px', marginTop: '20px'}}>
                <input
                    type='text'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    style={{
                        padding: '5px',
                        fontSize: '16px',
                        width: '200px',
                        marginRight: '10px',
                    }}
                />
                <button
                    onClick={handleAddTodo}
                    style={{
                        padding: '5px 10px',
                        fontSize: '16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>
                    Add Todo
                </button>
            </div>
            <ul style={{listStyleType: 'none', padding: '0'}}>
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        style={{
                            marginBottom: '5px',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <span style={{marginRight: '10px'}}>{todo}</span>
                        <button
                            onClick={() => handleDeleteTodo(index)}
                            style={{
                                padding: '5px 10px',
                                fontSize: '16px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

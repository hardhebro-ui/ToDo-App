
import { useState, useEffect, useCallback } from 'react';
import type { Todo } from '../types';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const localData = localStorage.getItem('todos');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Could not parse todos from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const checkReminders = useCallback(() => {
        if (Notification.permission !== 'granted') return;
        
        const now = Date.now();
        const todosToNotify = todos.filter(todo => 
            todo.dueDate && 
            !todo.completed && 
            todo.dueDate <= now && 
            !todo.notified
        );

        todosToNotify.forEach(todo => {
            new Notification('Task Due!', {
                body: todo.text,
                icon: '/favicon.ico' 
            });
            // Mark as notified to prevent spamming
            updateTodo(todo.id, todo.text, todo.dueDate, true);
        });
    }, [todos]);

    useEffect(() => {
        const intervalId = setInterval(checkReminders, 60 * 1000); // Check every minute
        // Initial check on load
        checkReminders();
        return () => clearInterval(intervalId);
    }, [checkReminders]);

    const addTodo = (text: string, dueDate?: number) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: Date.now(),
            dueDate,
        };
        setTodos(prevTodos => [newTodo, ...prevTodos]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const updateTodo = (id: string, text: string, dueDate?: number, notified?: boolean) => {
        setTodos(prevTodos =>
            prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text, dueDate, notified: notified ?? todo.notified };
                }
                return todo;
            })
        );
    };

    return { todos, addTodo, toggleTodo, deleteTodo, updateTodo };
};


import React from 'react';
import type { Todo } from '../types';
import { CalendarIcon, PencilIcon, TrashIcon } from './Icons';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (todo: Todo) => void;
}

const formatDate = (timestamp?: number) => {
    if (!timestamp) return null;

    const date = new Date(timestamp);
    const now = new Date();
    
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toDateString() === date.toDateString();

    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) return `Today at ${time}`;
    if (isTomorrow) return `Tomorrow at ${time}`;

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ` at ${time}`;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
    const isOverdue = todo.dueDate && !todo.completed && todo.dueDate < Date.now();
    const formattedDate = formatDate(todo.dueDate);

    return (
        <div className="group flex items-center bg-slate-800 p-4 rounded-lg shadow-md transition-all duration-200 hover:bg-slate-700/50">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-5 h-5 rounded-full text-indigo-500 bg-slate-700 border-slate-600 focus:ring-indigo-600 focus:ring-2 cursor-pointer"
            />
            <div className="flex-1 ml-4">
                <p className={`text-lg ${todo.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {todo.text}
                </p>
                {formattedDate && (
                    <div className={`flex items-center text-sm mt-1 gap-1.5 ${
                        isOverdue ? 'text-red-400' : 'text-slate-400'
                    }`}>
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                    onClick={() => onEdit(todo)}
                    className="p-2 rounded-md text-slate-400 hover:bg-slate-600 hover:text-white"
                    aria-label="Edit task"
                >
                    <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => onDelete(todo.id)}
                    className="p-2 rounded-md text-slate-400 hover:bg-red-500 hover:text-white"
                    aria-label="Delete task"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;


import React, { useState } from 'react';
import { PlusIcon } from './Icons';

interface AddTaskFormProps {
    onAdd: (text: string, dueDate?: number) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const date = dueDate ? new Date(dueDate).getTime() : undefined;
            onAdd(text.trim(), date);
            setText('');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-lg">
            <PlusIcon className="w-6 h-6 text-slate-500 ml-2" />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 bg-transparent text-lg text-slate-200 placeholder-slate-500 focus:outline-none"
            />
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-slate-700/50 text-slate-400 border border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                // The color-scheme style helps ensure the date picker icon is visible in dark mode
                style={{colorScheme: 'dark'}}
            />
            <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                disabled={!text.trim()}
            >
                Add
            </button>
        </form>
    );
};

export default AddTaskForm;

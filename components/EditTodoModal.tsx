
import React, { useState, useEffect } from 'react';
import type { Todo } from '../types';

interface EditTodoModalProps {
    todo: Todo;
    onUpdate: (id: string, text: string, dueDate?: number) => void;
    onClose: () => void;
}

const toDateTimeLocal = (timestamp?: number): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    // Adjust for timezone offset to display correctly in datetime-local input
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
};

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onUpdate, onClose }) => {
    const [text, setText] = useState(todo.text);
    const [dueDate, setDueDate] = useState(toDateTimeLocal(todo.dueDate));

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const date = dueDate ? new Date(dueDate).getTime() : undefined;
            onUpdate(todo.id, text.trim(), date);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-lg border border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-white mb-6">Edit Task</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="taskText" className="block text-sm font-medium text-slate-400 mb-2">
                            Task Name
                        </label>
                        <input
                            id="taskText"
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full bg-slate-700/50 text-slate-100 border border-slate-600 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                         <label htmlFor="dueDate" className="block text-sm font-medium text-slate-400 mb-2">
                            Due Date
                        </label>
                        <input
                            id="dueDate"
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full bg-slate-700/50 text-slate-200 border border-slate-600 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{colorScheme: 'dark'}}
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTodoModal;


import React, { useState, useMemo, useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import type { Todo, FilterType } from './types';
import { Filter } from './types';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import AddTaskForm from './components/AddTaskForm';
import EditTodoModal from './components/EditTodoModal';
import { CalendarIcon, CheckCircleIcon, ListBulletIcon, SparklesIcon, SunIcon } from './components/Icons';

const App: React.FC = () => {
    const { 
        todos, 
        addTodo, 
        toggleTodo, 
        deleteTodo, 
        updateTodo 
    } = useTodos();
    
    const [filter, setFilter] = useState<FilterType>(Filter.All);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    const filteredTodos = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();

        switch (filter) {
            case Filter.Active:
                return todos.filter(todo => !todo.completed);
            case Filter.Completed:
                return todos.filter(todo => todo.completed);
            case Filter.Today:
                return todos.filter(todo => 
                    todo.dueDate && todo.dueDate >= startOfToday && todo.dueDate < startOfTomorrow
                );
            case Filter.Upcoming:
                 return todos.filter(todo => 
                    todo.dueDate && todo.dueDate >= startOfTomorrow
                );
            case Filter.All:
            default:
                return todos;
        }
    }, [todos, filter]);

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
    };

    const handleUpdate = (id: string, text: string, dueDate?: number) => {
        updateTodo(id, text, dueDate);
        setEditingTodo(null);
    };

    const filterCounts = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
        
        return {
            [Filter.All]: todos.length,
            [Filter.Active]: todos.filter(t => !t.completed).length,
            [Filter.Completed]: todos.filter(t => t.completed).length,
            [Filter.Today]: todos.filter(t => t.dueDate && t.dueDate >= startOfToday && t.dueDate < startOfTomorrow).length,
            [Filter.Upcoming]: todos.filter(t => t.dueDate && t.dueDate >= startOfTomorrow).length,
        };
    }, [todos]);
    
    // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    const filterIcons: Record<FilterType, React.ReactElement> = {
        [Filter.All]: <ListBulletIcon className="w-5 h-5" />,
        [Filter.Today]: <SunIcon className="w-5 h-5" />,
        [Filter.Upcoming]: <CalendarIcon className="w-5 h-5" />,
        [Filter.Active]: <SparklesIcon className="w-5 h-5" />,
        [Filter.Completed]: <CheckCircleIcon className="w-5 h-5" />,
    };

    return (
        <div className="flex h-screen w-screen font-sans">
            <Sidebar 
                currentFilter={filter} 
                setFilter={setFilter} 
                counts={filterCounts}
                icons={filterIcons}
            />
            <main className="flex-1 flex flex-col bg-slate-800/50">
                <header className="p-6 border-b border-slate-700/60">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                       {filterIcons[filter]}
                       {filter} Tasks
                    </h1>
                </header>
                <div className="flex-1 overflow-y-auto p-6">
                    <TodoList
                        todos={filteredTodos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onEdit={handleEdit}
                    />
                </div>
                <div className="p-6 border-t border-slate-700/60">
                    <AddTaskForm onAdd={addTodo} />
                </div>
            </main>
            {editingTodo && (
                <EditTodoModal
                    todo={editingTodo}
                    onUpdate={handleUpdate}
                    onClose={() => setEditingTodo(null)}
                />
            )}
        </div>
    );
};

export default App;
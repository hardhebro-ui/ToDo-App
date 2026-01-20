
import React from 'react';
import type { Todo } from '../types';
import TodoItem from './TodoItem';
import { InboxIcon } from './Icons';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
    if (todos.length === 0) {
        return (
            <div className="text-center py-20">
                <InboxIcon className="w-24 h-24 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400">All Clear!</h3>
                <p className="text-slate-500">Looks like there's nothing here. Add a new task below.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default TodoList;

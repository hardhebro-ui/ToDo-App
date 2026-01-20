
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    dueDate?: number;
    notified?: boolean;
}

export enum Filter {
    All = 'All',
    Today = 'Today',
    Upcoming = 'Upcoming',
    Active = 'Active',
    Completed = 'Completed',
}

export type FilterType = Filter;

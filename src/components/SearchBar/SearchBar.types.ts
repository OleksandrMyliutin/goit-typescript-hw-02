export interface SearchBarProps {
    handleChangeQuery: (query: string) => void;
    toast: {
        error: (message: string) => void;
    };
}

export interface FormValues {
    query: string;
}
export type ApiValue<T> = {
    value: T;
    isLoaded: boolean;
    error?: any;
}
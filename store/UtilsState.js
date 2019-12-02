export const FETCH_LOADING = "FETCH_LOADING";

export default {
    isLoading: (state = false, { type, payload }) => {
        if (type === FETCH_LOADING) {
            const { isLoading } = payload;
            return state = isLoading;
        }
        return state;
    }
}
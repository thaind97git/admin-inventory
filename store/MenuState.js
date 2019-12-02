export const TOGGLE_MENU = "TOGGLE_MENU";


export default {
    isOpenMenu: (state = false, { payload, type }) => {
        if (type === TOGGLE_MENU) {
            const { toggleMenu } = payload;
            return toggleMenu;
        }
        return state;
    }
}
import Vuex from 'vuex';

export default (() => {
    return new Vuex.Store({
        state: {
            counter: 0
        },
        mutations: {
            updateCount (state, num) {
                state.counter = num;
            }
        }
    })
});
import {SharedState} from "react-native-shared-state";

const LoginState = new SharedState({
    token: "",
    userInfo: null,
    android: null
});
const Favorites = new SharedState({
    counter: 0,
    list: [],
});

export {
    LoginState,
    Favorites
};

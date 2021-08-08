import './App.css';
import { connect } from "react-redux";
import MyCalendar from './components/Calendar/Calendar';

function App() {
    return (
        <div className="App">
            <MyCalendar/>
        </div>
    );
}

// const mDTS = state => ({
//     // isLoading: state.isLoading,
//     // error: state.error,
// });

// const mDTP = state => {
//     // getUserAction,
//     // getTrainingAction,
// };

export default connect(null)(App);

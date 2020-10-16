import React from 'react';
import { render } from 'react-dom';

const App = () => {
    const name = 'Rost'
    return (
        <div>
            {name}
        </div>
    );
};

render(<App />, document.getElementById('root'))
import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import MembersList from './containers/MembersList';

ReactDOM.render(
    <div className="container-fluid">
        <MembersList/>
    </div>,
        document.getElementById('root')
);

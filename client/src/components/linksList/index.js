import React from 'react';
import { Link } from 'react-router-dom';

class LinkList extends React.Component {
    render() {
        return (
            <div>
                <p>Navigate to a Page</p>
                <ul>
                    <li><Link to="/property">Property</Link></li>
                    <li><Link to="/registration">Registration</Link></li>
                    <li><Link to="/results">Results</Link></li>
                    <li><Link to="/dashboard">Dashboard 'Logout'</Link></li>
                </ul>
            </div>
        );
    }
}

export default LinkList;
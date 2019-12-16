import React from 'react';
import { render } from 'react-dom';

import MainView from './components/main/main.jsx'

const wrapper = document.getElementById('root');

wrapper ? render(<MainView />, wrapper) : false; 

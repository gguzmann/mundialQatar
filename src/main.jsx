  import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import { createBrowserRouter, RouterProvider } from 'react-router-dom';
  import App from './App';
  import { Apostar } from './components/Apostar';
  import { Equipos } from './components/Equipos';
  import { Home } from './components/Home';
  import { NavBar } from './components/NavBar';
  import { Partidos } from './components/Partidos';
  import { Ranking } from './components/Ranking';
  import { AuthProvider } from './context/authContext';
  import { StoreProvider } from './context/storeContext';



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
<App/>
  // </React.StrictMode>
)

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import { Equipos } from './components/Equipos';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import { Partidos } from './components/Partidos';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <NavBar />,
      errorElement: <h1>Error</h1>,
      children: [
        {
          path: "home",
          element: <Home />
        },
        {
          path: "partidos",
          element: <Partidos />
        },
        {
          path: "equipos",
          element: <Equipos />
        }

      ]

    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  // </React.StrictMode>
)

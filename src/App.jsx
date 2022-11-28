import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Apostar } from './components/Apostar';
import { Equipos } from './components/Equipos';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import { Partidos } from './components/Partidos';
import { Ranking } from './components/Ranking';
import { AuthProvider } from './context/authContext';
import { StoreProvider } from './context/storeContext';

const App = () => {
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
                index: true,
                path: "/",
                element: <Home />
              },
              {
                path: "partidos",
                element: <Partidos />
              },
              {
                path: "equipos",
                element: <Equipos />
              },
              {
                path: "apostar",
                element: <Apostar />
              },
              {
                path: "ranking",
                element: <Ranking />
              }
      
            ]
      
          }
        ]
      )

    return (
        <>
            <AuthProvider>
                <StoreProvider>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </StoreProvider>
            </AuthProvider>
        </>
    )
}

export default App
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Articles from "./screens/Articles";
import Projects from "./screens/Projects";
import Skills from "./screens/Skills";
import Uses from "./screens/Uses";
import { StoreContextProvider } from "./context";
import Blog from "./screens/Blog";
import Chat from "./components/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/skills",
    element: <Skills />,
  },
  {
    path: "/uses",
    element: <Uses />,
  },
  {
    path: "/blog/:title",
    element: <Blog />,
  },
]);

function App() {
  return (
    <StoreContextProvider>
      <Chat />
      <RouterProvider router={router} />
    </StoreContextProvider>
  );
}

export default App;

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseProvider from "@context/shared";
import { Home } from "@components/home";
import { Movie } from "@components/movie";

function App() {
  return (
    <>
      <BrowserRouter>
        <MantineProvider defaultColorScheme="dark">
          <BaseProvider>
            <Routes>
              <Route path="/*" element={<Home></Home>}></Route>
              <Route path="/movie" element={<Movie></Movie>}></Route>
            </Routes>
          </BaseProvider>
        </MantineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";

function App() {
    const content = (
      <Routes>
        <Route path="/">
          <Route index element={<h1>ГЛАВНАЯ</h1>} />
          
          {/* Редирект если 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );

    return content;
}

export default App;
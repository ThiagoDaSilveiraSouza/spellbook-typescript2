// context
import { DataProvider } from "./context";

// Routes
import { AppRoutes } from "./AppRoutes";

// styles
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <DataProvider>
        <AppRoutes />
      </DataProvider>
    </div>
  );
}

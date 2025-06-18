import { useSession } from "./hooks/useSession";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";
import { Paper, Box } from "@mui/material";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  const { token } = useSession();
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "100%", width: "100%" }}>
      <Paper elevation={3} sx={{ minWidth: 300, minHeight: 300, maxWidth: "1000px", width: "100%", display: "flex" }}>
        <ErrorBoundary fallback={<Box>Oops! Something failed.</Box>}>
        {token ? <Chat /> : <Login />}
        </ErrorBoundary>
      </Paper>
    </Box>
  );
}

export default App;

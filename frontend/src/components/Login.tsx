import { useRef, useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography, Alert, Divider, Avatar } from "@mui/material";
import { Key, User } from "lucide-react";
import { useSession } from "../hooks/useSession";

export function Login() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useSession();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = inputRef.current?.value?.trim() ?? "";
    if (!username) return;

    setLoading(true);
    setError(null);
    try {
      await login(username);
    } catch (err: unknown) {
      setError("Login failed. Please check your username.");
      console.error("Login error:", err instanceof Error ? err.message : err);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = () => {
    const currentValue = inputRef.current?.value ?? "";
    setIsInputFilled(currentValue.trim().length > 0);
  };

  return (
    <Box sx={{ padding: 4, width: 400, display: "flex", flexDirection: "column", margin: "0 auto" }}>
      <Box display="flex" alignItems="center" justifyContent="center" width="100%" flexDirection="column">
        <Avatar sx={{ width: 100, height: 100 }}>
          <User size={50} />
        </Avatar>
        <Typography variant="h6" gutterBottom mt={2}>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please pick a username to join the chat.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleLogin}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "stretch",
            mt: 2,
          }}
        >
          <TextField
            label="Username"
            inputRef={inputRef}
            onInput={handleInput}
            disabled={loading}
            fullWidth
            autoFocus
            size="medium"
            sx={{
              "& .MuiInputBase-root": {
                height: "100%",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isInputFilled}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Key size={20} />}
            sx={{
              whiteSpace: "nowrap",
              minWidth: 120,
              px: 2,
            }}
          >
            <span style={{ paddingLeft: "5px" }}>Login</span>
          </Button>
        </Box>
      </form>
    </Box>
  );
}

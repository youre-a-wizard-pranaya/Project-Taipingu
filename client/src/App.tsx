import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import TypingPage from "@/pages/TypingPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TypingPage} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;

import { useEffect } from "react";
import { Auth } from "./components/Auth"
import { useChatStore } from "./store/useChatStore"
import { supabase } from "./supabaseClient";
import { Dashboard } from "./components/Dashboard";


function App() {
const {user,setUser}=useChatStore()

useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser({ id: session?.user.id || "", email: session?.user.email || "" });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email || "" }
          : null
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return <Auth />;
  }

  return <Dashboard />;
};

export default App;
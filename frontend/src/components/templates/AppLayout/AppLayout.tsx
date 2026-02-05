import { CleanHeader } from "../../organisms/Header/CleanHeader";
import { Outlet } from "react-router-dom";

// Structural Contract
// Behavioural Contract
// Integration Rules
// Forbidden Patterns
export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CleanHeader
        searchQuery=""
        onSearchChange={() => {}}
        onToggleFilters={() => {}}
        isFiltersOpen={false}
        currentUser={null}
        onSignIn={() => {}}
        onSignUp={() => {}}
      />

      <div className="flex pt-[72px]">
        {/* <aside className="hidden md:block w-[80px]">
          <SidebarNav />
        </aside> */}

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* <MobileBottomNav />
      <PlayerBar /> */}
    </div>
  );
}

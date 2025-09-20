import { useState, useMemo } from "react";
import { Header } from "@/components/alumni/Header";
import { FilterBar, FilterState } from "@/components/alumni/FilterBar";
import { ProfileCard, AlumniProfile } from "@/components/alumni/ProfileCard";
import { ProfileModal } from "@/components/alumni/ProfileModal";
import { mockAlumniData } from "@/data/mockAlumni";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    graduationYear: "",
    branch: "",
    company: ""
  });
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock user state
  const [isLoggedIn] = useState(false);
  const [userInfo] = useState<{ name: string } | undefined>(undefined);

  // Filter and search logic
  const filteredAlumni = useMemo(() => {
    return mockAlumniData.filter((alumni) => {
      // Search by name
      const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by graduation year
      const matchesYear = !filters.graduationYear || 
        alumni.graduationYear.toString() === filters.graduationYear;
      
      // Filter by branch
      const matchesBranch = !filters.branch || 
        alumni.branch === filters.branch;
      
      // Filter by company
      const matchesCompany = !filters.company || 
        alumni.currentCompany.toLowerCase().includes(filters.company.toLowerCase());
      
      return matchesSearch && matchesYear && matchesBranch && matchesCompany;
    });
  }, [searchQuery, filters]);

  const handleProfileClick = (profile: AlumniProfile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handleClearFilters = () => {
    setFilters({
      graduationYear: "",
      branch: "",
      company: ""
    });
  };

  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log("Login clicked");
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAlumni.length} of {mockAlumniData.length} alumni
          </p>
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlumni.map((alumni) => (
              <ProfileCard
                key={alumni.id}
                profile={alumni}
                onClick={handleProfileClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No alumni found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      {/* Profile Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;

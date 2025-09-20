import { ExternalLink, Building, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface AlumniProfile {
  id: string;
  name: string;
  linkedinUrl: string;
  graduationYear: number;
  branch: string;
  currentCompany: string;
  email?: string;
  phone?: string;
  showEmail: boolean;
  showPhone: boolean;
  profilePicture?: string;
  jobTitle?: string;
  location?: string;
}

interface ProfileCardProps {
  profile: AlumniProfile;
  onClick: (profile: AlumniProfile) => void;
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(profile.linkedinUrl, '_blank');
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-card-hover group"
      onClick={() => onClick(profile)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Profile Picture */}
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {profile.profilePicture ? (
              <img 
                src={profile.profilePicture} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-primary">
                {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>

          {/* Name */}
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {profile.name}
            </h3>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mt-1">
              <GraduationCap className="h-3 w-3" />
              <span>{profile.branch}, Class of {profile.graduationYear}</span>
            </div>
          </div>

          {/* Current Company */}
          <div className="flex items-center space-x-2 text-sm">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{profile.currentCompany}</span>
          </div>

          {/* Job Title */}
          {profile.jobTitle && (
            <p className="text-sm text-muted-foreground">{profile.jobTitle}</p>
          )}

          {/* Location */}
          {profile.location && (
            <p className="text-xs text-muted-foreground">{profile.location}</p>
          )}

          {/* LinkedIn Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLinkedInClick}
            className="w-full flex items-center space-x-2 mt-4"
          >
            <ExternalLink className="h-4 w-4" />
            <span>LinkedIn</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
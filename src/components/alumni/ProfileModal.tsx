import { X, ExternalLink, Mail, Phone, MapPin, Building, GraduationCap, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlumniProfile } from "./ProfileCard";

interface ProfileModalProps {
  profile: AlumniProfile | null;
  isOpen: boolean;
  onClose: () => void;
  isOwnProfile?: boolean;
  onEdit?: () => void;
}

export function ProfileModal({ profile, isOpen, onClose, isOwnProfile, onEdit }: ProfileModalProps) {
  if (!profile) return null;

  const handleLinkedInClick = () => {
    window.open(profile.linkedinUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Alumni Profile</span>
            {isOwnProfile && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-4 pb-6 border-b border-border">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {profile.profilePicture ? (
                <img 
                  src={profile.profilePicture} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-semibold text-primary">
                  {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              )}
            </div>

            {/* Name & Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
              {profile.jobTitle && (
                <p className="text-lg text-muted-foreground mt-1">{profile.jobTitle}</p>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Academic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>Academic Information</span>
              </h3>
              
              <div className="space-y-3 pl-7">
                <div>
                  <p className="text-sm text-muted-foreground">Graduation Year</p>
                  <Badge variant="secondary" className="mt-1">
                    Class of {profile.graduationYear}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Branch/Department</p>
                  <p className="font-medium">{profile.branch}</p>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Professional Information</span>
              </h3>
              
              <div className="space-y-3 pl-7">
                <div>
                  <p className="text-sm text-muted-foreground">Current Company</p>
                  <p className="font-medium">{profile.currentCompany}</p>
                </div>
                
                {profile.jobTitle && (
                  <div>
                    <p className="text-sm text-muted-foreground">Job Title</p>
                    <p className="font-medium">{profile.jobTitle}</p>
                  </div>
                )}
                
                {profile.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Information</h3>
            
            <div className="space-y-3">
              {/* Email */}
              {profile.email && profile.showEmail && (
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href={`mailto:${profile.email}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Phone */}
              {profile.phone && profile.showPhone && (
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a 
                      href={`tel:${profile.phone}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* LinkedIn */}
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-primary"
                    onClick={handleLinkedInClick}
                  >
                    View LinkedIn Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
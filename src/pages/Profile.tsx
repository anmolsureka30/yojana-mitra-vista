
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Edit, Save, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    location: "",
    language: "en",
    income: "",
    familySize: "",
    occupation: "",
    category: "",
    education: "",
  });
  const [profileCompletion, setProfileCompletion] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('userProfile');
    if (userData) {
      const parsed = JSON.parse(userData);
      setProfileData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  useEffect(() => {
    // Calculate profile completion
    const fields = Object.values(profileData);
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    const completion = Math.round((filledFields / fields.length) * 100);
    setProfileCompletion(completion);
  }, [profileData]);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const connectDigiLocker = () => {
    toast({
      title: "DigiLocker Integration",
      description: "This feature will be available soon!",
    });
  };

  const categories = [
    { value: "general", label: "General" },
    { value: "obc", label: "OBC" },
    { value: "sc", label: "SC" },
    { value: "st", label: "ST" },
    { value: "ews", label: "EWS" },
  ];

  const educationLevels = [
    { value: "no-formal", label: "No Formal Education" },
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "higher-secondary", label: "Higher Secondary" },
    { value: "graduate", label: "Graduate" },
    { value: "post-graduate", label: "Post Graduate" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>

          {/* Profile Completion Card */}
          <Card className="mb-6 slide-in-right">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Profile Completion</CardTitle>
                  <CardDescription>Complete your profile to get better scheme recommendations</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-saffron">{profileCompletion}%</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={profileCompletion} className="h-3" />
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card className="fade-in-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-india rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Your basic details and preferences</CardDescription>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={isEditing ? "bg-indian-green hover:bg-indian-green/90" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    value={profileData.aadhaar}
                    onChange={(e) => setProfileData(prev => ({ ...prev, aadhaar: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    value={profileData.income}
                    onChange={(e) => setProfileData(prev => ({ ...prev, income: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="e.g., 200000"
                  />
                </div>

                <div>
                  <Label htmlFor="familySize">Family Size</Label>
                  <Input
                    id="familySize"
                    type="number"
                    value={profileData.familySize}
                    onChange={(e) => setProfileData(prev => ({ ...prev, familySize: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Number of family members"
                  />
                </div>

                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => setProfileData(prev => ({ ...prev, occupation: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="e.g., Farmer, Teacher, Student"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={profileData.category}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, category: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select
                    value={profileData.education}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, education: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((edu) => (
                        <SelectItem key={edu.value} value={edu.value}>
                          {edu.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* DigiLocker Integration */}
              <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-indian-blue" />
                    <div>
                      <h3 className="font-semibold text-gray-800">DigiLocker Integration</h3>
                      <p className="text-sm text-gray-600">Connect to auto-fill documents and certificates</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Secure
                    </Badge>
                    <Button onClick={connectDigiLocker} variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

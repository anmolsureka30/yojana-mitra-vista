
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Shield, 
  Accessibility, 
  Bell, 
  User, 
  Smartphone,
  Mail,
  MessageSquare,
  Eye,
  Volume2,
  Moon,
  Sun,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    language: "en",
    fontSize: 16,
    highContrast: false,
    darkMode: false,
    voiceGuidance: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: false,
    dataSharing: false,
    analytics: true,
    personalization: true,
    profileVisibility: "private"
  });

  const { toast } = useToast();

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी (Hindi)" },
    { value: "ta", label: "தமிழ் (Tamil)" },
    { value: "te", label: "తెలుగు (Telugu)" },
    { value: "bn", label: "বাংলা (Bengali)" },
    { value: "mr", label: "मराठी (Marathi)" },
    { value: "gu", label: "ગુજરાતી (Gujarati)" },
    { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { value: "ml", label: "മലയാളം (Malayalam)" },
    { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "or", label: "ଓଡ଼ିଆ (Odia)" },
    { value: "as", label: "অসমীয়া (Assamese)" }
  ];

  const consentItems = [
    {
      id: "dataSharing",
      title: "Data Sharing with Government Departments",
      description: "Allow sharing your profile data with relevant government departments for scheme eligibility",
      required: true
    },
    {
      id: "analytics",
      title: "Usage Analytics",
      description: "Help improve YojanaMitra by sharing anonymous usage data",
      required: false
    },
    {
      id: "personalization",
      title: "Personalized Recommendations",
      description: "Use your data to provide personalized scheme recommendations",
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your preferences and privacy settings</p>
          </div>

          <Card className="fade-in-up">
            <CardContent className="p-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="language">Language</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-saffron" />
                        <CardTitle>Profile Settings</CardTitle>
                      </div>
                      <CardDescription>Manage your account and profile preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Profile Visibility</Label>
                          <p className="text-sm text-gray-600">Control who can see your profile information</p>
                        </div>
                        <Select 
                          value={settings.profileVisibility} 
                          onValueChange={(value) => updateSetting("profileVisibility", value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Bell className="h-5 w-5 text-saffron" />
                        <CardTitle>Notifications</CardTitle>
                      </div>
                      <CardDescription>Choose how you want to receive updates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-4 w-4 text-gray-600" />
                          <div>
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-gray-600">Receive app notifications on your device</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-gray-600" />
                          <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-600">Get updates via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-4 w-4 text-gray-600" />
                          <div>
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-gray-600">Receive SMS updates</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                          <div>
                            <Label>WhatsApp Notifications</Label>
                            <p className="text-sm text-gray-600">Get updates on WhatsApp</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.whatsappNotifications}
                          onCheckedChange={(checked) => updateSetting("whatsappNotifications", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Language Settings */}
                <TabsContent value="language" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-saffron" />
                        <CardTitle>Language & Region</CardTitle>
                      </div>
                      <CardDescription>Choose your preferred language for the interface</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-base mb-4 block">Interface Language</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {languages.map((lang) => (
                            <div
                              key={lang.value}
                              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                settings.language === lang.value
                                  ? "border-saffron bg-orange-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => updateSetting("language", lang.value)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{lang.label}</span>
                                {settings.language === lang.value && (
                                  <Check className="h-4 w-4 text-saffron" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Privacy Settings */}
                <TabsContent value="privacy" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-saffron" />
                        <CardTitle>Privacy & Data</CardTitle>
                      </div>
                      <CardDescription>Control how your data is used and shared</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 mb-2">Data Protection Compliance</h3>
                        <p className="text-sm text-blue-700">
                          YojanaMitra complies with the Digital Personal Data Protection Act, 2023. 
                          Your data is processed securely and used only for providing government scheme services.
                        </p>
                      </div>

                      {consentItems.map((item) => (
                        <div key={item.id} className="flex items-start justify-between space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Label className="text-base">{item.title}</Label>
                              {item.required && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <Switch
                            checked={settings[item.id as keyof typeof settings] as boolean}
                            onCheckedChange={(checked) => updateSetting(item.id, checked)}
                            disabled={item.required}
                          />
                        </div>
                      ))}

                      <div className="pt-4 border-t border-gray-200">
                        <Button variant="outline" className="w-full">
                          Download My Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Accessibility Settings */}
                <TabsContent value="accessibility" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Accessibility className="h-5 w-5 text-saffron" />
                        <CardTitle>Accessibility</CardTitle>
                      </div>
                      <CardDescription>Customize the app for better accessibility</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Eye className="h-4 w-4 text-gray-600" />
                          <div>
                            <Label>High Contrast Mode</Label>
                            <p className="text-sm text-gray-600">Improve visibility with higher contrast</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.highContrast}
                          onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Volume2 className="h-4 w-4 text-gray-600" />
                          <div>
                            <Label>Voice Guidance</Label>
                            <p className="text-sm text-gray-600">Enable audio instructions and feedback</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.voiceGuidance}
                          onCheckedChange={(checked) => updateSetting("voiceGuidance", checked)}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Label>Font Size</Label>
                            <p className="text-sm text-gray-600">Adjust text size for better readability</p>
                          </div>
                          <span className="text-sm font-medium">{settings.fontSize}px</span>
                        </div>
                        <Slider
                          value={[settings.fontSize]}
                          onValueChange={(value) => updateSetting("fontSize", value[0])}
                          max={24}
                          min={12}
                          step={2}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Small</span>
                          <span>Large</span>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-800 mb-2">WCAG 2.1 Compliance</h3>
                        <p className="text-sm text-green-700">
                          YojanaMitra follows Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards 
                          to ensure accessibility for users with disabilities.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

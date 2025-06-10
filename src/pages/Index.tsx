
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, ArrowRight, Users, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    location: "",
    language: "en"
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const recognitionRef = useRef<any>(null);

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = formData.language === 'hi' ? 'hi-IN' : 'en-IN';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast({
          title: "Voice input started",
          description: "Please speak your details...",
        });
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({ ...prev, name: transcript }));
        toast({
          title: "Voice captured",
          description: `Heard: ${transcript}`,
        });
      };

      recognitionRef.current.onerror = () => {
        toast({
          title: "Voice input error",
          description: "Please try again or type manually.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Please use manual input.",
        variant: "destructive",
      });
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.aadhaar || !formData.phone) {
      toast({
        title: "Incomplete form",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Store user data (in real app, this would go to backend)
    localStorage.setItem('userProfile', JSON.stringify(formData));
    
    toast({
      title: "Welcome to YojanaMitra!",
      description: "Your profile has been created successfully.",
    });
    
    navigate('/profile');
  };

  const features = [
    {
      icon: Users,
      title: "Multilingual Support",
      description: "Available in 22+ Indian languages"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with highest security"
    },
    {
      icon: Zap,
      title: "Smart Matching",
      description: "AI-powered scheme recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-india">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
        <div className="absolute top-0 w-full h-full bg-gradient-to-br from-saffron/20 to-indian-green/20"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="fade-in-up">
                <h1 className="text-white font-bold text-5xl md:text-6xl mb-6">
                  Welcome to
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200">
                    YojanaMitra
                  </span>
                </h1>
                <p className="mt-4 text-lg text-white/90 mb-8">
                  Your trusted companion for accessing government schemes and services. 
                  Empowering every Indian citizen with ease and dignity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Form Section */}
      <div className="relative -mt-32 px-4 pb-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-8/12 px-4">
              <Card className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-lg bg-white/95 backdrop-blur-sm slide-in-right">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                    Let's Get Started
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Tell us about yourself to find the best schemes for you
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Voice Input Section */}
                    <div className="text-center mb-6">
                      <Button
                        type="button"
                        onClick={isListening ? stopVoiceInput : startVoiceInput}
                        className={`w-20 h-20 rounded-full ${
                          isListening 
                            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                            : 'bg-saffron hover:bg-saffron/90 pulse-mic'
                        } transition-all duration-300`}
                      >
                        {isListening ? (
                          <MicOff className="h-8 w-8 text-white" />
                        ) : (
                          <Mic className="h-8 w-8 text-white" />
                        )}
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        {isListening ? "Listening... Click to stop" : "Click to speak your name"}
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                        <Input
                          id="aadhaar"
                          type="text"
                          placeholder="1234 5678 9012"
                          value={formData.aadhaar}
                          onChange={(e) => setFormData(prev => ({ ...prev, aadhaar: e.target.value }))}
                          className="mt-1"
                          maxLength={12}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Mobile Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="City, State"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                          <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                          <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                          <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-indian-green hover:bg-indian-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose YojanaMitra?
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                We make government schemes accessible to every Indian citizen
              </p>
            </div>
          </div>

          <div className="flex flex-wrap">
            {features.map((feature, index) => (
              <div key={index} className="w-full md:w-4/12 px-4 text-center mb-12">
                <div className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-saffron p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-orange-50">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h6 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h6>
                    <p className="mb-4 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default Index;

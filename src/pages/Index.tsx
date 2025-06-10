import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

  // Government scheme images for the carousel
  const schemeImages = [
    {
      src: "/lovable-uploads/2acf1a34-7576-40a6-83ea-9beb202f4a3d.png",
      alt: "Government Schemes Overview",
      title: "Government Schemes"
    },
    {
      src: "/lovable-uploads/7d7b7bf3-a641-4069-abce-bac2369d3d48.png",
      alt: "Various Government Schemes",
      title: "Citizen Services"
    },
    {
      src: "/lovable-uploads/d30dec90-1ddb-4b80-a780-ed1e64636a84.png",
      alt: "Government Investment Schemes",
      title: "Investment Programs"
    },
    {
      src: "/lovable-uploads/4c82267e-96fc-4e8a-aebd-d97361662a9f.png",
      alt: "G20 India Initiative",
      title: "G20 India 2023"
    },
    {
      src: "/lovable-uploads/faa25632-44a5-4430-9705-d5ff9a1b1013.png",
      alt: "India.gov.in Portal",
      title: "National Portal"
    },
    {
      src: "/lovable-uploads/15e12ef7-f207-43bc-b3ed-124fbee6585d.png",
      alt: "IRCTC Services",
      title: "Railway Services"
    }
  ];

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
      {/* Hero Section with Enhanced Animated Carousel */}
      <div className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-gradient-to-br from-saffron/30 to-indian-green/30"></div>
        
        {/* Enhanced Background Carousel */}
        <div className="absolute inset-0 opacity-20">
          <Carousel className="w-full h-full" opts={{ loop: true, duration: 80 }}>
            <CarouselContent className="h-full">
              {schemeImages.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative h-full w-full flex items-center justify-center p-4">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg animate-fade-in shadow-2xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="container relative mx-auto px-4 z-10">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="fade-in-up">
                <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                  Welcome to
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200 mt-2">
                    YojanaMitra
                  </span>
                </h1>
                <p className="mt-4 text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Your trusted companion for accessing government schemes and services. 
                  Empowering every Indian citizen with ease and dignity.
                </p>
                
                {/* Enhanced Featured Schemes Carousel */}
                <div className="mt-8 mb-8">
                  <Carousel className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto" opts={{ loop: true }}>
                    <CarouselContent>
                      {schemeImages.map((image, index) => (
                        <CarouselItem key={index}>
                          <Card className="bg-white/15 backdrop-blur-md border-white/30 shadow-xl">
                            <CardContent className="p-4 sm:p-6">
                              <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <p className="text-white text-sm sm:text-base font-medium text-center">{image.title}</p>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-white border-white/40 hover:bg-white/20 left-2 sm:left-4" />
                    <CarouselNext className="text-white border-white/40 hover:bg-white/20 right-2 sm:right-4" />
                  </Carousel>
                </div>
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
                <CardHeader className="text-center px-4 sm:px-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Let's Get Started
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    Tell us about yourself to find the best schemes for you
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-4 sm:px-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Voice Input Section */}
                    <div className="text-center mb-6">
                      <Button
                        type="button"
                        onClick={isListening ? stopVoiceInput : startVoiceInput}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${
                          isListening 
                            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                            : 'bg-saffron hover:bg-saffron/90 pulse-mic'
                        } transition-all duration-300`}
                      >
                        {isListening ? (
                          <MicOff className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        ) : (
                          <Mic className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        )}
                      </Button>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2">
                        {isListening ? "Listening... Click to stop" : "Click to speak your name"}
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm sm:text-base">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1 text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="aadhaar" className="text-sm sm:text-base">Aadhaar Number *</Label>
                        <Input
                          id="aadhaar"
                          type="text"
                          placeholder="1234 5678 9012"
                          value={formData.aadhaar}
                          onChange={(e) => setFormData(prev => ({ ...prev, aadhaar: e.target.value }))}
                          className="mt-1 text-sm sm:text-base"
                          maxLength={12}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm sm:text-base">Mobile Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1 text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="location" className="text-sm sm:text-base">Location</Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="City, State"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="mt-1 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="language" className="text-sm sm:text-base">Preferred Language</Label>
                      <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger className="mt-1 text-sm sm:text-base">
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
                      className="w-full bg-indian-green hover:bg-indian-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
          <div className="flex flex-wrap justify-center text-center mb-16 sm:mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Why Choose YojanaMitra?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                We make government schemes accessible to every Indian citizen
              </p>
            </div>
          </div>

          <div className="flex flex-wrap">
            {features.map((feature, index) => (
              <div key={index} className="w-full md:w-4/12 px-4 text-center mb-8 sm:mb-12">
                <div className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-saffron p-3 text-center inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 shadow-lg rounded-full bg-orange-50">
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h6 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h6>
                    <p className="mb-4 text-gray-600 text-sm sm:text-base">
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

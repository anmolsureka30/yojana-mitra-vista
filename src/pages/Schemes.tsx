
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, IndianRupee, Users, Heart, GraduationCap, Sprout, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const schemes = [
    {
      id: 1,
      name: "PM-KISAN Samman Nidhi",
      description: "Financial assistance of ₹6,000 per year for small and marginal farmers",
      benefits: "₹6,000/year",
      category: "agriculture",
      state: "all",
      eligibility: "Small and marginal farmers with cultivable land up to 2 hectares",
      documents: ["Aadhaar", "Bank Account", "Land Records"],
      status: "eligible",
      icon: Sprout,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      name: "Ayushman Bharat - PMJAY",
      description: "Health insurance coverage of up to ₹5 lakh per family per year",
      benefits: "₹5 lakh insurance",
      category: "health",
      state: "all",
      eligibility: "Families covered under SECC-2011 (rural) and occupational criteria (urban)",
      documents: ["Aadhaar", "Ration Card", "Income Certificate"],
      status: "eligible",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 3,
      name: "PM Scholarship Scheme",
      description: "Scholarships for children of Ex-Servicemen and Ex-Coast Guard personnel",
      benefits: "Up to ₹3,000/month",
      category: "education",
      state: "all",
      eligibility: "Children of Ex-Servicemen, studying in professional courses",
      documents: ["Educational Certificates", "Ex-Servicemen Certificate", "Income Certificate"],
      status: "not-eligible",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 4,
      name: "Pradhan Mantri Awas Yojana",
      description: "Housing for all scheme providing financial assistance for home construction",
      benefits: "Up to ₹2.67 lakh subsidy",
      category: "housing",
      state: "all",
      eligibility: "EWS, LIG, and MIG families without pucca house",
      documents: ["Income Certificate", "Property Papers", "Bank Account"],
      status: "eligible",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 5,
      name: "National Social Assistance Programme",
      description: "Social security for elderly, widows, and disabled persons",
      benefits: "₹200-₹300/month",
      category: "social-security",
      state: "all",
      eligibility: "Senior citizens (60+), widows, disabled persons below poverty line",
      documents: ["Age Proof", "Income Certificate", "Disability Certificate (if applicable)"],
      status: "eligible",
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "agriculture", label: "Agriculture" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "housing", label: "Housing" },
    { value: "social-security", label: "Social Security" }
  ];

  const states = [
    { value: "all", label: "All States" },
    { value: "ap", label: "Andhra Pradesh" },
    { value: "ka", label: "Karnataka" },
    { value: "mh", label: "Maharashtra" },
    { value: "tn", label: "Tamil Nadu" },
    { value: "up", label: "Uttar Pradesh" }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    const matchesState = selectedState === "all" || scheme.state === selectedState || scheme.state === "all";
    
    return matchesSearch && matchesCategory && matchesState;
  });

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Voice search started",
          description: "Speak the scheme name you're looking for...",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        toast({
          title: "Voice search captured",
          description: `Searching for: ${transcript}`,
        });
      };

      recognition.onerror = () => {
        toast({
          title: "Voice search error",
          description: "Please try again or use text search.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice search not supported",
        description: "Please use text search instead.",
        variant: "destructive",
      });
    }
  };

  const applyForScheme = (schemeId: number) => {
    const scheme = schemes.find(s => s.id === schemeId);
    if (scheme?.status === "not-eligible") {
      toast({
        title: "Not Eligible",
        description: "You don't meet the eligibility criteria for this scheme.",
        variant: "destructive",
      });
    } else {
      localStorage.setItem('selectedScheme', JSON.stringify(scheme));
      navigate('/applications');
      toast({
        title: "Proceeding to Application",
        description: `Starting application for ${scheme?.name}`,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Eligible</Badge>;
      case "not-eligible":
        return <Badge variant="destructive">Not Eligible</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Government Schemes</h1>
            <p className="text-gray-600">Discover schemes matched to your profile</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 fade-in-up">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search schemes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-16"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={isListening ? undefined : startVoiceSearch}
                    disabled={isListening}
                    className={`absolute right-2 top-1 ${isListening ? 'text-red-500' : 'text-gray-400 hover:text-saffron'}`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* State Filter */}
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme, index) => (
              <Card
                key={scheme.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${scheme.bgColor} mb-3`}>
                      <scheme.icon className={`h-6 w-6 ${scheme.color}`} />
                    </div>
                    {getStatusBadge(scheme.status)}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{scheme.name}</CardTitle>
                  <CardDescription className="line-clamp-3">{scheme.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">{scheme.benefits}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Eligibility:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{scheme.eligibility}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Documents:</h4>
                    <div className="flex flex-wrap gap-1">
                      {scheme.documents.slice(0, 2).map((doc, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                      {scheme.documents.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{scheme.documents.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => applyForScheme(scheme.id)}
                    className={`w-full ${
                      scheme.status === "eligible"
                        ? "bg-indian-green hover:bg-indian-green/90"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    disabled={scheme.status === "not-eligible"}
                  >
                    {scheme.status === "eligible" ? "Apply Now" : "Not Eligible"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No schemes found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schemes;

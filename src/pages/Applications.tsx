
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Upload, 
  ExternalLink,
  AlertCircle,
  RefreshCw,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      schemeName: "PM-KISAN Samman Nidhi",
      applicationDate: "2024-01-15",
      status: "approved",
      statusText: "Approved",
      progress: 100,
      nextPayment: "2024-06-15",
      amount: "₹2,000",
      reference: "PMK2024001234",
      documents: ["Aadhaar", "Bank Account", "Land Records"],
      timeline: [
        { date: "2024-01-15", status: "submitted", text: "Application Submitted" },
        { date: "2024-01-20", status: "review", text: "Under Review" },
        { date: "2024-01-25", status: "verified", text: "Documents Verified" },
        { date: "2024-02-01", status: "approved", text: "Application Approved" }
      ]
    },
    {
      id: 2,
      schemeName: "Ayushman Bharat - PMJAY",
      applicationDate: "2024-02-01",
      status: "processing",
      statusText: "Under Review",
      progress: 60,
      nextPayment: null,
      amount: "₹5 lakh coverage",
      reference: "AB2024005678",
      documents: ["Aadhaar", "Ration Card", "Income Certificate"],
      timeline: [
        { date: "2024-02-01", status: "submitted", text: "Application Submitted" },
        { date: "2024-02-05", status: "review", text: "Under Review" },
        { date: "2024-02-10", status: "verification", text: "Document Verification in Progress" }
      ]
    },
    {
      id: 3,
      schemeName: "Pradhan Mantri Awas Yojana",
      applicationDate: "2024-01-10",
      status: "rejected",
      statusText: "Rejected",
      progress: 30,
      nextPayment: null,
      amount: "₹2.67 lakh subsidy",
      reference: "PMAY2024001122",
      documents: ["Income Certificate", "Property Papers", "Bank Account"],
      rejectionReason: "Income exceeds eligibility criteria",
      timeline: [
        { date: "2024-01-10", status: "submitted", text: "Application Submitted" },
        { date: "2024-01-15", status: "review", text: "Under Review" },
        { date: "2024-01-22", status: "rejected", text: "Application Rejected" }
      ]
    }
  ]);
  
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processing</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const retryApplication = (id: number) => {
    toast({
      title: "Retry Application",
      description: "This feature will be available soon!",
    });
  };

  const escalateIssue = (id: number) => {
    toast({
      title: "Escalation Initiated",
      description: "Your issue has been forwarded to higher authorities.",
    });
  };

  const downloadCertificate = (id: number) => {
    toast({
      title: "Certificate Download",
      description: "Downloading your approval certificate...",
    });
  };

  const approvedApplications = applications.filter(app => app.status === "approved");
  const pendingApplications = applications.filter(app => app.status === "processing");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Applications</h1>
            <p className="text-gray-600">Track and manage your scheme applications</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-3xl font-bold text-gray-800">{applications.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-saffron" />
                </div>
              </CardContent>
            </Card>

            <Card className="fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-3xl font-bold text-green-600">{approvedApplications.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Processing</p>
                    <p className="text-3xl font-bold text-yellow-600">{pendingApplications.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications Tabs */}
          <Card className="slide-in-right">
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>View and manage your scheme applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
                  <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
                  <TabsTrigger value="processing">Processing ({pendingApplications.length})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="space-y-6">
                    {applications.map((app, index) => (
                      <ApplicationCard
                        key={app.id}
                        application={app}
                        index={index}
                        onRetry={retryApplication}
                        onEscalate={escalateIssue}
                        onDownload={downloadCertificate}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="approved" className="mt-6">
                  <div className="space-y-6">
                    {approvedApplications.map((app, index) => (
                      <ApplicationCard
                        key={app.id}
                        application={app}
                        index={index}
                        onRetry={retryApplication}
                        onEscalate={escalateIssue}
                        onDownload={downloadCertificate}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="processing" className="mt-6">
                  <div className="space-y-6">
                    {pendingApplications.map((app, index) => (
                      <ApplicationCard
                        key={app.id}
                        application={app}
                        index={index}
                        onRetry={retryApplication}
                        onEscalate={escalateIssue}
                        onDownload={downloadCertificate}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rejected" className="mt-6">
                  <div className="space-y-6">
                    {rejectedApplications.map((app, index) => (
                      <ApplicationCard
                        key={app.id}
                        application={app}
                        index={index}
                        onRetry={retryApplication}
                        onEscalate={escalateIssue}
                        onDownload={downloadCertificate}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ApplicationCard = ({ 
  application, 
  index, 
  onRetry, 
  onEscalate, 
  onDownload 
}: {
  application: any;
  index: number;
  onRetry: (id: number) => void;
  onEscalate: (id: number) => void;
  onDownload: (id: number) => void;
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processing</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow duration-300 fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {application.schemeName}
                </h3>
                <p className="text-sm text-gray-600">
                  Applied on {new Date(application.applicationDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Reference: {application.reference}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(application.status)}
                {getStatusBadge(application.status)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Benefit Amount</p>
                <p className="text-lg font-semibold text-saffron">{application.amount}</p>
              </div>
              {application.nextPayment && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Next Payment</p>
                  <p className="text-sm text-gray-600">
                    {new Date(application.nextPayment).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Progress</p>
                <p className="text-sm text-gray-600">{application.progress}%</p>
              </div>
              <Progress value={application.progress} className="h-2" />
            </div>

            {application.rejectionReason && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Rejection Reason:</strong> {application.rejectionReason}
                </p>
              </div>
            )}

            {/* Timeline */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Status Timeline</p>
              <div className="space-y-2">
                {application.timeline.map((event: any, idx: number) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      event.status === 'approved' ? 'bg-green-500' :
                      event.status === 'rejected' ? 'bg-red-500' :
                      event.status === 'verification' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{event.text}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 lg:ml-6">
            {application.status === "approved" && (
              <Button
                onClick={() => onDownload(application.id)}
                className="bg-indian-green hover:bg-indian-green/90"
                size="sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            )}
            
            {application.status === "rejected" && (
              <Button
                onClick={() => onRetry(application.id)}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Application
              </Button>
            )}
            
            {(application.status === "processing" || application.status === "rejected") && (
              <Button
                onClick={() => onEscalate(application.id)}
                variant="outline"
                size="sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Escalate Issue
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Applications;

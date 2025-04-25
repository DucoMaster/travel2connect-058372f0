import { Eye, Users, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventPackageDetails } from "@/types/event-packages";

interface PackageOwnerStatsProps {
  pkg: EventPackageDetails;
}

const PackageOwnerStats = ({ pkg }: PackageOwnerStatsProps) => {
  return (
    <Card className="mt-6 border-travel-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-travel-700">
          Performance Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-travel-50 rounded-lg">
            <Eye className="h-6 w-6 text-travel-500 mb-2" />
            <h3 className="text-sm font-medium text-gray-600">Visitors</h3>
            <p className="text-2xl font-bold text-travel-700">0</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-travel-50 rounded-lg">
            <Users className="h-6 w-6 text-travel-500 mb-2" />
            <h3 className="text-sm font-medium text-gray-600">Attendees</h3>
            <p className="text-2xl font-bold text-travel-700">0</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-travel-50 rounded-lg">
            <CreditCard className="h-6 w-6 text-travel-500 mb-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Credits Earned
            </h3>
            <p className="text-2xl font-bold text-travel-700">0</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageOwnerStats;

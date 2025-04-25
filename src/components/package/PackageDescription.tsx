import React from "react";
import { Package } from "@/types";
import { Calendar, Users, CreditCard } from "lucide-react";
import { formatDateRange } from "@/utils/PackageUtils";
import { EventPackageDetails } from "@/types/event-packages";

interface PackageDescriptionProps {
  pkg: EventPackageDetails;
  formatDate: (date: Date) => string;
}

const PackageDescription = ({ pkg, formatDate }: PackageDescriptionProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-travel-700">
        About This Experience
      </h2>
      <p className="mt-2 text-gray-600 leading-relaxed">{pkg?.description}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start">
          <Calendar className="mr-3 h-5 w-5 text-travel-500" />
          <div>
            <h3 className="font-medium text-gray-900">Date</h3>
            <p className="text-gray-600">
              {formatDateRange(
                new Date(pkg?.start_date),
                new Date(pkg?.end_date)
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="mr-3 h-5 w-5 text-travel-500" />
          <div>
            <h3 className="font-medium text-gray-900">Group Size</h3>
            <p className="text-gray-600">
              {pkg?.capacity ? `Up to ${pkg.capacity} people` : "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <CreditCard className="mr-3 h-5 w-5 text-travel-500" />
          <div>
            <h3 className="font-medium text-gray-900">Price</h3>
            <p className="text-gray-600">{pkg?.price} credits per person</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDescription;

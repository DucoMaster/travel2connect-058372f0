import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, TabType, UserRole } from "@/types";
import { useDebounce } from "use-debounce";
import { Calendar, MapPin, Users } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { AdvertisingSpace } from "@/components/advertising/AdvertisingSpace";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFilteredPackages } from "@/actions/package-queries";
import { EventPackageDetails } from "@/types/event-packages";
import { Spinner } from "@/components/spinner";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getRoleCTA = (
  userRole: UserRole | undefined,
  pkg: EventPackageDetails
) => {
  switch (userRole) {
    case "traveler":
      return {
        text: "Book Now",
        link: `/packages/${pkg.id}/book`,
      };
    case "guide":
      return {
        text: "Apply to Guide",
        link: `/packages/${pkg.id}/apply`,
      };
    case "agent":
      return {
        text: "View Details",
        link: `/packages/${pkg.id}`,
      };
    case "venue":
      return {
        text: "View Details",
        link: `/packages/${pkg.id}`,
      };
    default:
      return {
        text: "View Details",
        link: `/packages/${pkg.id}`,
      };
  }
};

const PackageCard = ({ pkg }: { pkg: EventPackageDetails }) => {
  const { user } = useUser();
  const cta = getRoleCTA(user?.role, pkg);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={
            pkg?.image_urls[0] ||
            "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          }
          alt={pkg.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-1">{pkg.title}</CardTitle>
          <Badge variant="outline" className="bg-travel-50 text-travel-700">
            {pkg.price} credits
          </Badge>
        </div>
        <CardDescription className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          {pkg.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pkg.description}
        </p>
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          {pkg?.start_date && pkg?.end_date ? (
            new Date(pkg.start_date).getTime() ===
            new Date(pkg.end_date).getTime() ? (
              formatDate(new Date(pkg.start_date))
            ) : (
              `${formatDate(new Date(pkg.start_date))} - ${formatDate(
                new Date(pkg.end_date)
              )}`
            )
          ) : (
            <>N/A</>
          )}
        </div>
        {pkg.capacity && (
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <Users className="mr-1 h-3.5 w-3.5" />
            <span>Max {pkg.capacity} people</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-travel-500 hover:bg-travel-600" asChild>
          <Link to={cta.link}>{cta.text}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Home = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("tours");
  const [search] = useDebounce(searchTerm, 1000);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const {
    data: filteredPackages,
    isLoading,
    isError,
    error,
  } = useFilteredPackages(search, activeTab, fromDate, toDate);

  const getWelcomeMessage = () => {
    if (!user) {
      return "Discover amazing travel experiences";
    }

    switch (user.role) {
      case "traveler":
        return "Discover your next adventure";
      case "guide":
        return "Find guiding opportunities";
      case "agent":
        return "Manage your travel packages";
      case "venue":
        return "Promote your events and venue";
      default:
        return "Welcome to TravelConnect";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-travel-800">
              {getWelcomeMessage()}
            </h1>
            <p className="mt-2 text-travel-600">
              {user
                ? `Welcome ${user.name || user.email}! You have ${
                    user.credits
                  } credits to use.`
                : "Connect with local guides, events, and venues"}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <SearchBar
            search={searchTerm}
            setSearch={setSearchTerm}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </section>

        <section className="mb-8">
          <AdvertisingSpace />
        </section>

        <section className="mb-6">
          <Tabs
            value={activeTab}
            onValueChange={(value: TabType) => setActiveTab(value as TabType)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="tours">Tours</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="rental">Rental</TabsTrigger>
              <TabsTrigger value="guide">Guide</TabsTrigger>
            </TabsList>
          </Tabs>
        </section>

        {isLoading ? (
          <>
            <div className="h-[60vh] w-full flex items-center justify-center">
              <Spinner />
            </div>
          </>
        ) : (
          <section>
            {filteredPackages?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages?.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-900">
                  No packages found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </section>
        )}

        {!user && (
          <section className="mt-12 bg-gradient-to-r from-travel-600 to-coral-500 rounded-xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Join Travel2Connect Today
              </h2>
              <p className="mt-3 text-white/90">
                Create an account to browse and book exclusive travel
                experiences, or register as a guide, agent, or venue to offer
                your services.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-travel-700 hover:bg-gray-100"
                  asChild
                >
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <div className="bg-travel-500 text-white p-1 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-bold text-travel-700">TravelConnect</span>
            </div>
            <div className="text-center sm:text-right text-sm text-gray-500">
              <p>© 2025 TravelConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

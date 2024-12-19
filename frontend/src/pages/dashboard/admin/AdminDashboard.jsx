import React from "react";
// import RevenueChart from "./RevenueChart";
import { Icon } from "@iconify/react";
import DashboardCard from "../dashboard/DashboardCard";
import Button from "../../../components/Button/Button";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useGet } from "../../../hooks/useGet";
import RecentSignings from "./RecentSignings";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useLocalStorage("user", "");

  const cards = [
    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(255, 153, 0, 0.5)",
      },
      name: "Total No Users",
      value: "32",
      percentage: 70,
    },
    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(0, 153, 255, 0.5)",
      },
      name: "Total no of Visits",
      value: "39",
      percentage: 50,
    },
    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(51, 204, 153, 0.5)",
      },
      name: "Number of other Mainteners or admins",
      value: "32",

      percentage: 90,
    },
    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(51, 204, 153, 0.5)",
      },
      name: "Number of other Mainteners or admins",
      value: "2",

      percentage: 90,
    },
  ];

  return (
    <div className="container mx-auto bg-black">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div>
          <div className="flex flex-wrap">
            {cards.map((card, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-2">
                <DashboardCard {...card} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Link to={"/dashboard/users"}>
            <Button isCircular buttonColor="btn-orange" type="submit">
              {"Assign Role"}
            </Button>
          </Link>
        </div>
      </div>
      <RecentSignings />
    </div>
  );
};

export default AdminDashboard;

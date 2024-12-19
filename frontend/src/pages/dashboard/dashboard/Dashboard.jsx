import React from "react";
// import RevenueChart from "./RevenueChart";
import { Icon } from "@iconify/react";
import Button from "../../../components/Button/Button";
import DashboardCard from "./DashboardCard";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useGet } from "../../../hooks/useGet";
import CharacterCard from "./CharacterCard";
import CharacterList from "../components/CharacterList";

const Dashboard = () => {
  const [user, setUser] = useLocalStorage("user", "");

  const cards = [
    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(255, 153, 0, 0.5)",
      },
      name: "Total No Players",
      value: "32",
      percentage: 70,
    },

    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(255, 102, 102, 0.5)",
      },
      name: "Number of cool kids",
      value: "32",

      percentage: 30,
    },
    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(51, 204, 153, 0.5)",
      },
      name: "Number of cooler kids",

      value: "32",
      percentage: 90,
    },
    {
      icon: {
        icon: <Icon icon="mdi:account-student" />,
        gradient: "rgba(51, 204, 153, 0.5)",
      },
      name: "Number of coolest kids",
      value: "ds",
      percentage: 90,
    },
  ];

  return (
    <div className="container mx-auto bg-black">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div>
          <div className="bg-gray-900 p-8 rounded-lg text-4xl mt-4 mb-8">
            You Are a {user?.role}!!!<span className="text-5xl">💮</span>
            <p>Merry Xmas and a Prosperious new year 🎄</p>
          </div>
          <div className="flex flex-wrap">
            {cards.map((card, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-2">
                <DashboardCard {...card} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <CharacterCard />
          <Button isCircular buttonColor="btn-orange" type="submit">
            {"Play Game"}
          </Button>
        </div>
      </div>
      {user?.role !== "Cool Kid" ? (
        <div className="p-8 m-8">
          <CharacterList />
        </div>
      ) : (
        <div className="text-white text-center bg-gray-700">
          Access denied. Upgrade to Cooler or Coolest Kid to view other user
          characters.
        </div>
      )}
    </div>
  );
};

export default Dashboard;

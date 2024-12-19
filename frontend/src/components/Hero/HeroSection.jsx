import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../Button/Button";

function HeroSection({}) {
  useEffect(() => {
    AOS.init();
  }, []);
  const handleScroll = () => {
    const parallaxHero = document.getElementById("parallax-hero");
    const scrollValue = window.scrollY;
    parallaxHero.style.backgroundPositionY = `${scrollValue * 0.5}px`;
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div style={{ background: "black" }}>
      <div
        id="parallax-hero"
        className={`parallax-hero flex flex-col
           justify-center sm:justify-center items-center px-2 w-full sm:px-20 py-6 md:py-4 `}
        data-aos={"fade-right"}
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000"
      >
        <h1
          className={`text-white text-center font-medium text-5xl sm:text-7xl   pb-2`}
        >
          Welcome to the coolest kids world.
        </h1>

        <p className={`text-white py-8  text-lg `}>
          Play great games as a child on this network..
        </p>
        <Link to={"/login"} className={"pl-0 md:pl-4 pt-2 sm:pt-0"}>
          <Button
            buttonColor={"btn-orange"}
            isCircular
            height={"32"}
            width={"full"}
            style={{ width: "400px" }}
            suffixIcon={<Icon icon="ep:right" />}
          >
            {"Login"}
          </Button>
        </Link>
        <Link to={"/register"} className={"my-3 pl-0 md:pl-4 pt-2 sm:pt-0"}>
          <Button
            // buttonColor={"btn-orange"}
            isCircular
            height={"32"}
            width={"full"}
            suffixIcon={<Icon icon="ep:right" />}
          >
            {"Sign up"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;

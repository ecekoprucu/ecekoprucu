import Header from "../components/Header";
import { motion } from "motion/react";
import {
  faIndustry,
  faFlaskVial,
  faTrophy,
  faStethoscope,
  faRectangleAd,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const WorkPage = () => {
  return (
    <section id="work">
      <Header />
      <div className="w-screen min-h-[calc(100vh_-_3rem)] bg-gray-200 dark:bg-gray-700 px-3 py-6 flex flex-col items-center gap-10">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-[95%] border p-2 rounded-sm border-gray-800 dark:border-gray-200 cursor-pointer shadow-lg"
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.5 },
            backgroundColor: "#a8acda22",
          }}
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                Bosphorus Industrial Software Solutions
              </p>
              <FontAwesomeIcon
                icon={faIndustry}
                className="text-gray-800 dark:text-gray-200 text-2xl"
              />
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-md">
              November 2023 - Current
            </p>
          </div>
          <p className="font-light text-gray-800 dark:text-gray-200 text-sm mt-2">
            * Front end development of internal apps’ control panel platform:
            <strong>Biss Admin Panel</strong> <br /> * Front end development of
            the internal chatbot web app: <strong>BiBot</strong> <br /> * Front
            end development of the bearing marketplace from scratch:{" "}
            <strong>Bearing Online</strong> (https://bearingonline.net/)
            <br /> * Front end development of factory control portal:{" "}
            <strong>DigiFact & LogiFact</strong> <br />
            <br />
            <i>
              During my career in BISS, I’ve had a chance to create UIs of the
              web apps in ReactJS with .NET backend and communicate through REST
              API. Started to use MUI as the main component library. For state
              management, we use Redux and Toolkit. Our main focus is B2B
              solutions, mostly for logistics and factory management which
              requires data implementation in Charts and Tables. Using ChartJS
              and Material React Table for these projects.
            </i>
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-[95%] border p-2 rounded-sm border-gray-800 dark:border-gray-200 cursor-pointer shadow-lg"
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.5 },
            backgroundColor: "#a8acda22",
          }}
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                OAK's Lab
              </p>
              <FontAwesomeIcon
                icon={faFlaskVial}
                className="text-gray-800 dark:text-gray-200 text-2xl"
              />
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-md">
              April 2022 - July 2023
            </p>
          </div>
          <p className="font-light text-gray-800 dark:text-gray-200 text-sm mt-2">
            * Front end & simple back end development of security teams’ panel
            platform: <strong>PlexTrac</strong> <br />* Mobile development of
            the app: <strong>Decision Pigeons</strong> <br />* Front end
            development of the food ordering website and app:{" "}
            <strong>Crave</strong> <br /> <br />
            <i>
              While working in OAK’S LAB, I’ve deep dived into writing React
              with TypeScript. I have used GraphQL and Apollo for communicating
              with the NodeJS backend. As the main component library, we chose
              Ant Design combined with Styled Components. Also had a brief
              chance to use React Native for the mobile app projects seen above.
            </i>
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-[95%] border p-2 rounded-sm border-gray-800 dark:border-gray-200 cursor-pointer shadow-lg"
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.5 },
            backgroundColor: "#a8acda22",
          }}
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                Community Gaming
              </p>
              <FontAwesomeIcon
                icon={faTrophy}
                className="text-gray-800 dark:text-gray-200 text-2xl"
              />
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-md">
              November 2021 - April 2022
            </p>
          </div>
          <p className="font-light text-gray-800 dark:text-gray-200 text-sm mt-2">
            * Front end development of an online blockchain-based e-sports
            tournament creation platform. <br />
            <br />
            <i>
              In Community Gaming, I was responsible for improving the already
              established event creation website, fix bugs and add new features.
              Started to use NextJS professionally for the first time. For
              styling, we were using SASS. And for the backend communication:
              GraphQL and Apollo.
            </i>
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-[95%] border p-2 rounded-sm border-gray-800 dark:border-gray-200 cursor-pointer shadow-lg"
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.5 },
            backgroundColor: "#a8acda22",
          }}
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                Kodmed
              </p>
              <FontAwesomeIcon
                icon={faStethoscope}
                className="text-gray-800 dark:text-gray-200 text-2xl"
              />
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-md">
              June 2020 - November 2021
            </p>
          </div>
          <p className="font-light text-gray-800 dark:text-gray-200 text-sm mt-2">
            * Developed web and mobile applications focusing on AI solutions for
            doctors. <br />
            <br />
            <i>
              For Kodmed, I’ve developed medical web and mobile applications.
              The biggest one was for the IVF procedure. We created a panel for
              doctors to pick the best embryo and the other qualities for this.
              The website was heavily focused on Forms and feeding the AI in the
              back from the data we get from the doctors. Used Tailwind for
              styling with ReactJS and React Native. We used an older version of
              React Query (currently known as Tanstack React Query) and for
              state management, React’s Context API.
            </i>
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-[95%] border p-2 rounded-sm border-gray-800 dark:border-gray-200 cursor-pointer shadow-lg"
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.5 },
            backgroundColor: "#a8acda22",
          }}
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                Medyanet
              </p>
              <FontAwesomeIcon
                icon={faRectangleAd}
                className="text-gray-800 dark:text-gray-200 text-2xl"
              />
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-md">
              December 2019 - December 2020
            </p>
          </div>
          <p className="font-light text-gray-800 dark:text-gray-200 text-sm mt-2">
            * Collaborated with Turkey's biggest Advertisement Agency, creating
            Rich Media ads for high-traffic websites. <br />
            <br />
            <i>
              I was responsible for creating interactive and/or animated
              advertisement for the news agency. These ads were written in
              JavaScript, jQuery and occasionally PHP for the backend parts.
            </i>
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-[95%] border p-2 rounded-sm border-gray-800 dark:border-gray-200 cursor-pointer shadow-lg"
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.5 },
            backgroundColor: "#a8acda22",
          }}
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                Tudors
              </p>
              <FontAwesomeIcon
                icon={faShirt}
                className="text-gray-800 dark:text-gray-200 text-2xl"
              />
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-md">
              August 2018 - January 2019
            </p>
          </div>
          <p className="font-light text-gray-800 dark:text-gray-200 text-sm mt-2">
            * Developed an admin panel for company staff, enhancing internal
            operations. <br />
            <br />
            <i>
              Started the development of their internal platform, finalized the
              HR module. Used PHP for backend, HTML, CSS, JavaScript and jQuery
              for front end. Both parts were developed by me.
            </i>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export const AboutPage = () => {
  const textRef = useRef(null);

  const inView = useInView(textRef, { once: true });

  return (
    <section id="about">
      <div className="p-5 bg-gray-300 dark:bg-gray-700 ">
        <motion.p
          ref={textRef}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full text-gray-800 dark:text-gray-200"
        >
          I am a self-taught developer from İzmir, Turkey. <br />
          <br /> My professional career is a diverse journey, I’ve worked in
          industries such as healthcare, advertising and worked on control
          panels, custom marketplaces etc. I began my career in small, dynamic
          teams and have since progressed to collaborating with larger teams of
          over 50 members, gaining valuable experience along the way. My primary
          tech stack includes ReactJS, Redux, TypeScript, and Material-UI.
          Additionally, I have hands-on experience with Ant Design (AntD),
          Styled Components, Tailwind CSS, Next.js, and Context API. For data
          integration, I have worked with both GraphQL and RESTful APIs. One of
          my notable skills is creating user-friendly control panels, where I
          specialized in data visualization and chart development. My portfolio
          includes a wide range of charts—from timelines to bar, stacked, gauge,
          and pie charts. This experience has enhanced my ability to present
          complex data in intuitive and visually appealing formats.
          <br /> <br /> Early in my career, I improved my core JavaScript skills
          while developing multimedia advertisements for Turkey's largest news
          agency. These ads were designed for users with low technological
          expertise, requiring compatibility with older systems and browsers. I
          am fluent in both English and Turkish and hold a valid work permit in
          Sweden.
        </motion.p>
      </div>
    </section>
  );
};

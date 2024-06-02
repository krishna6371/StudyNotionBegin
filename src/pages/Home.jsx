import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/core/Homepage/HighlightText";
import { CBbutton } from "../components/core/Homepage/CBbutton";
import Banner from "../assets/Images/banner.mp4";
import StylingBoxes from "../components/core/Homepage/StylingBoxes";
import { Timeline } from "../components/core/Homepage/Timeline";
import { LearnLanguage } from "../components/core/Homepage/LearnLanguage";
import { InstructoDesign } from "../components/core/Homepage/InstructoDesign";
import { ExploreMore } from "../components/core/Homepage/ExploreMore";
import { NavBar } from "../components/common/NavBar";

const Home = () => {
  return (
    <div className="bg-richblack-900">
      <NavBar />
      {/* //for creating button */}
      <div className="   relative  mx-auto flex flex-col w-11/12  max-w-maxContent items-center text-white rounded-2xl justify-between">
        <Link to={"/signup"}>
          <div
            className=" group mt-20 p-3  rounded-full  bg-richblack-100    
			transition-all duration-200 hover:scale-75    "
          >
            <div className="flex flex-row gap-2 items-center  group-hover:bg-richblack-500 ">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* headings */}
        <div>
          {/* first heading */}
          <div className="bold  text-3xl text-center ">
            <p>
              Empower Your Future With
              <HighlightText text={"Coding Skills"} />
            </p>
          </div>
        </div>
        {/* paragraph */}

        <div className=" mt-4 w-[85%]  text- center  font-semibold  text-lg text-richblack-300 mx-auto">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        {/* Button */}
        <div className="flex flex-row gap-7  mt-5 mx-auto justify-center">
          <CBbutton linkto={"/signup"} flag={true}>
            LearnMore
          </CBbutton>
          <CBbutton linkto={"/login"} flag={false}>
            Book a Demo
          </CBbutton>
        </div>
        {/* video addition */}
        <div className="mx-3  my-12  shadow-blue-600">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4"></source>
          </video>
        </div>
        {/* code section1 */}
        <div>
          <StylingBoxes
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-bold">
                Unlock your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            cbutton1={{
              linkto: "/signup",
              flag: true,
              text: "try it Yourself",
            }}
            cbutton2={{
              linkto: "/login",
              flag: false,
              text: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Title of the document</title>\n</head>`}
          />
        </div>

        {/* code section2 */}
        <div>
          <StylingBoxes
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-bold">
                Unlock your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            cbutton1={{
              linkto: "/signup",
              flag: true,
              text: "try it Yourself",
            }}
            cbutton2={{
              linkto: "/login",
              flag: false,
              text: "Learn More",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Title of the document</title>\n</head>`}
          />
        </div>
        <ExploreMore />
      </div>
      {/* {second section} */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_backg h-[300px]">
          <div>
            <div className=" w-11/12 max-w-maxContent flex flex-row items-center justify-center  gap-10  mx-auto ">
              <div className="h-[250px]"></div>
              <CBbutton linkto={"/signup"} flag={true}>
                <div className="flex flex-row items-center gap-3">
                  ExploreFullCatalog
                  <FaArrowRight></FaArrowRight>
                </div>
              </CBbutton>
              <CBbutton linkto={"/login"} flag={false}>
                <p>Learn More</p>
              </CBbutton>
            </div>
          </div>
        </div>
        {/* {section 2} */}
        <div className=" w-11/12 justify-between flex flex-col mx-auto">
          <div className="flex flex-row justify-between gap-11 ">
            <div className="text-black w-[45%] text-3xl font-bold">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-col w-[40%] mx-auto items-start">
              <div>
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CBbutton linkto={"/login"} flag={true}>
                <div>Learn More</div>
              </CBbutton>
            </div>
          </div>
          {/* {2ND PART} */}
        </div>
        <Timeline />
        <LearnLanguage />
      </div>
      {/* third section */}
      <div
        className="w-11/12  flex flex-col items center   justify-between max-w-maxcontent text-white"
        style={{ marginTop: "20px" }}
      >
        <InstructoDesign />
        <h3 className="text-center mt-10 text-3xl font-bold">
          Reviews from Other Learners
        </h3>
      </div>
    </div>
  );
};
export default Home;
